import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

interface IModalOpenPayload {
  id: string;
  data?: any;
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private openSubject = new Subject<IModalOpenPayload>();
  private closeSubject = new Subject<string>();

  onOpen$: Observable<IModalOpenPayload> = this.openSubject.asObservable();
  onClose$: Observable<string> = this.closeSubject.asObservable();

  open(id: string, data?: any) {
    this.openSubject.next({ id, data });
  }

  close(id: string) {
    this.closeSubject.next(id);
  }
}
