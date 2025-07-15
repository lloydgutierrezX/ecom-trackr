import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Subscription } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RefreshTimerService {

  private refreshSubject = new BehaviorSubject<void>(undefined);
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
