import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalService } from '../../services/modal/modal.service';

@Component({
  selector: 'app-base-modal',
  standalone: true,
  imports: [],
  templateUrl: './base-modal.component.html'
})
export class BaseModalComponent implements OnInit, OnDestroy {
  @Input() modalId!: string;

  @ViewChild('dialogEl') dialogRef!: ElementRef<HTMLDialogElement>;

  private subOpen?: Subscription;
  private subClose?: Subscription;
  data: any;

  constructor(
    private modalSrvc: ModalService
  ) { }

  ngOnInit(): void {
    this.subOpen = this.modalSrvc.onOpen$.subscribe(({ id, data }) => {
      if (id !== this.modalId) {
        return;
      }

      this.data = data;
      this.dialogRef.nativeElement.showModal();
    });

    this.subClose = this.modalSrvc.onClose$.subscribe((id) => {
      if (id !== this.modalId) {
        return;
      }

      this.dialogRef.nativeElement.close();
    });
  }

  ngOnDestroy(): void {
    this.subClose?.unsubscribe();
    this.subOpen?.unsubscribe();
  }

  close() {
    this.modalSrvc.close(this.modalId);
  }
}
