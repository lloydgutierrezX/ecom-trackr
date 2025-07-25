import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { refreshTimer, RefreshTimerService } from '../refresh-timer/refresh-timer.service';

interface IModalOpenPayload {
  id: string;
  config?: any;
  data?: any;
}

@Injectable({ providedIn: 'root' })
export class ModalService {

  constructor(private refreshSrvc: RefreshTimerService) { }

  private openSubject = new Subject<IModalOpenPayload>();
  private closeSubject = new Subject<string>();

  onOpen$: Observable<IModalOpenPayload> = this.openSubject.asObservable();
  onClose$: Observable<string> = this.closeSubject.asObservable();

  open(id: string, config?: any, data?: any) {
    if (id === 'form-modal') {
      this.refreshSrvc.stop();
    }
    this.openSubject.next({ id, config, data });
  }

  close(id: string) {
    if (id === 'form-modal') {
      this.refreshSrvc.stop();
      this.refreshSrvc.start(refreshTimer);
    }

    this.closeSubject.next(id);
  }
}
