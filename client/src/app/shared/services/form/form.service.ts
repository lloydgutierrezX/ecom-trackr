import { Injectable } from '@angular/core';
import { catchError, finalize, Observable, of, take, tap } from 'rxjs';
import { ToastService } from '../toast/toast.service';
import { LoaderService } from '../loader/loader.service';
import { refreshTimer, RefreshTimerService } from '../refresh-timer/refresh-timer.service';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  constructor(
    private toastSrvc: ToastService,
    private loaderSrvc: LoaderService,
    private refreshTimerSrvc: RefreshTimerService) { }

  onSave<T>(payload: T, handler: (payload: T) => Observable<any>) {
    return handler(payload)
      .pipe(
        take(1),
        tap(() => this.toastSrvc.success('Saved successfully!')),
        catchError((err) => {
          this.toastSrvc.error('Something went wrong.');
          console.error('[FormService]', err);
          return of(null);
        }),
        finalize(() => {
          this.loaderSrvc.hide();
          this.refreshTimerSrvc.stop();
          this.refreshTimerSrvc.start(refreshTimer);
        })
      )
  }

  onDelete() {

  }

  onReset() {

  }
}
