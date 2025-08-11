import { Component, Input, OnDestroy } from '@angular/core';
import { BaseModalComponent } from "../../base-modal.component";
import { ModalService } from '../../../../services/modal/modal.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-alert-modal',
  standalone: true,
  imports: [BaseModalComponent],
  templateUrl: './alert-modal.component.html'
})
export class AlertModalComponent implements OnDestroy {
  @Input() modalId: 'alert-modal' = 'alert-modal';

  private destroy$ = new Subject<void>();

  message = 'Default message';
  type: 'info' | 'warning' | 'error' = 'info';

  constructor(private modalSrvc: ModalService) {
    this.modalSrvc.onOpen$
      .pipe(takeUntil(this.destroy$))
      .subscribe(({ id, data }) => {
        if (id !== this.modalId) {
          return;
        }

        this.message = data?.message ?? this.message;
        this.type = data?.type ?? 'info';
      })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
