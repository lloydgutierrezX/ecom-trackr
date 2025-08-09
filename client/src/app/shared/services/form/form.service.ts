import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, finalize, Observable, of, take, tap } from 'rxjs';
import { ToastService } from '../toast/toast.service';
import { LoaderService } from '../loader/loader.service';
import { refreshTimer, RefreshTimerService } from '../refresh-timer/refresh-timer.service';
import { ValidationErrors } from '@angular/forms';
import { IFormErrorResponse } from '../../interfaces/form.interface';
import { LoadDataService } from '../load-data/load-data.service';

export type IFormService<T> = Observable<T | { error: any } | null>;

@Injectable({
  providedIn: 'root'
})
export class FormService {
  constructor(
    private toastSrvc: ToastService,
    private loaderSrvc: LoaderService,
    private refreshTimerSrvc: RefreshTimerService,
    private loadDataSrvc: LoadDataService) { }

  private formErrorSubject = new BehaviorSubject<ValidationErrors>({});
  formError$ = this.formErrorSubject.asObservable();

  onSave<T>(id: string | null, payload: T, handler: ((payload: T) => Observable<any>) | ((id: string, payload: T) => Observable<any>)): IFormService<T | null> {
    this.loaderSrvc.show();

    const request$ = id ?
      (handler as (id: string, payload: T) => Observable<any>)(id, payload) :
      (handler as (payload: T) => Observable<any>)(payload);

    return request$
      .pipe(
        take(1),
        tap(() => this.onSuccess(id ? 'Record updated successfully.' : 'Record added successfully.')),
        catchError((response) => {
          console.error('Form submission error:', response);
          this.onError(response.error.errors);
          this.toastSrvc.error('Something went wrong.');
          return of({ error: response.error.errors });
        }),
        finalize(() => this.loaderSrvc.hide())
      )
  }

  onDelete<T>(id: string, handler: (id: string) => Observable<T>): IFormService<T | null> {
    if (!id || !handler) {
      console.error('Delete handler is not defined or id is missing.');
      return of(null);
    }

    return handler(id)
      .pipe(
        take(1),
        tap(() => this.onSuccess('Record deleted successfully.')),
        catchError((response) => {
          console.error('Delete error:', response);
          this.toastSrvc.error('Something went wrong.');
          return of({ error: response.error.errors });
        }),
        finalize(() => this.loaderSrvc.hide())
      );
  }

  private onSuccess(toastMessage: string) {
    this.loadDataSrvc.trigger();
    this.refreshTimerSrvc.stop();
    this.refreshTimerSrvc.start(refreshTimer);
    this.toastSrvc.success(toastMessage);
  }

  // handles form error from server response
  private onError(errors: IFormErrorResponse[]) {
    if (errors.length === 0) {
      return;
    }

    const formErrors: ValidationErrors = {};
    errors.forEach(error => {
      if (error['path'].length === 0) {
        return;
      }

      const field = error['path'][0];
      if (!formErrors[field]) {
        formErrors[field] = {
          [error['code']]: error['message']
        };
      }
    });

    this.formErrorSubject.next(formErrors);
  }
}
