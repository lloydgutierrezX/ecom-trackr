import { Injectable } from '@angular/core';
import { interval, Subject, Subscription } from 'rxjs';

export const refreshTimer = Number(1000 * 60 * 5);

@Injectable({ providedIn: 'root' })
export class RefreshTimerService {

  private refreshSubject = new Subject<void>();
  refesh$ = this.refreshSubject.asObservable();

  private subs?: Subscription;

  start(ms: number) {
    this.stop();
    this.subs = interval(ms).subscribe(() => this.refreshSubject.next());
  }

  stop() {
    this.subs?.unsubscribe();
    this.subs = undefined;
  }

  startManual() {
    this.refreshSubject.next();
  }
}
