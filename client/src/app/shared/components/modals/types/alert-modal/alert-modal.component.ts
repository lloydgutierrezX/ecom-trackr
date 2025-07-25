import { Component, Input } from '@angular/core';
import { BaseModalComponent } from "../../base-modal.component";
import { ModalService } from '../../../../services/modal/modal.service';

@Component({
  selector: 'app-alert-modal',
  standalone: true,
  imports: [BaseModalComponent],
  templateUrl: './alert-modal.component.html'
})
export class AlertModalComponent {
  @Input() modalId: string = 'alert-modal';

  message = 'Default message';
  type: 'info' | 'warning' | 'error' = 'info';

  constructor(private modalSrvc: ModalService) {
    this.modalSrvc.onOpen$.subscribe(({ id, data }) => {
      if (id !== this.modalId) {
        return;
      }

      this.message = data?.message ?? this.message;
      this.type = data?.type ?? 'info';
    })
  }
}
