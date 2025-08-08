import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, finalize, Observable, of, take, tap } from 'rxjs';
import { ToastService } from '../toast/toast.service';
import { LoaderService } from '../loader/loader.service';
import { refreshTimer, RefreshTimerService } from '../refresh-timer/refresh-timer.service';
import { ValidationErrors } from '@angular/forms';
import { IFormErrorResponse } from '../../interfaces/form.interface';
import { LoadDataService } from '../load-data/load-data.service';

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
  formError$ = this.formErrorSubject.asObservable();;

  onSave<T>(payload: T, handler: (payload: T) => Observable<any>): Observable<T | null> {
    this.loaderSrvc.show();
    return handler(payload)
      .pipe(
        take(1),
        tap(() => {
          this.loadDataSrvc.trigger();
          this.refreshTimerSrvc.stop();
          this.refreshTimerSrvc.start(refreshTimer);
          this.toastSrvc.success('Saved successfully!')
        }),
        catchError((response) => {
          this.onError(response.error.errors);
          this.toastSrvc.error('Something went wrong.');
          return of({ error: response.error.errors });
        }),
        finalize(() => this.loaderSrvc.hide())
      )
  }

  onDelete() {

  }

  onReset() {

  }

  // handles form error from server response
  onError(errors: IFormErrorResponse[]) {
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
