import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { BaseModalComponent } from '../../base-modal.component';
import { ModalService } from '../../../../services/modal/modal.service';
import { Observable, Subject, takeUntil } from 'rxjs';
import { IFormData } from '../../../../interfaces/form.interface';
import { FormService } from '../../../../services/form/form.service';
import { AuthService } from '../../../../services/auth/auth.service';
import { IConfirmActions, IModalActionEvent } from '../../../../interfaces/modal-action-events.interface';

@Component({
  selector: 'app-confirm-modal',
  standalone: true,
  imports: [BaseModalComponent],
  templateUrl: './confirm-modal.component.html'
})
export class ConfirmModalComponent implements OnInit, OnDestroy {
  @Input() modalId: 'confirm-modal' = 'confirm-modal';
  @Output() confirmedActionEmitter = new EventEmitter<IModalActionEvent>();

  destroy$ = new Subject<void>();

  formData: IFormData = {};
  action = '';
  handler!: <T>(payload?: T) => Observable<T>;

  isDisabled: boolean = false;

  get title(): string {
    return this.action ? `Confirm ${this.action}` : 'Confirm Action';
  }

  get message(): string {
    const name = this.formData?.['name'] || undefined;
    return name ?
      `Are you sure you want to ${this.action} ${name}?` :
      `Are you sure you want continue with this action?`;
  }

  constructor(
    private modalSrvc: ModalService,
    private formSrvc: FormService,
    private authSrvc: AuthService
  ) { }

  ngOnInit(): void {
    this.modalSrvc.onOpen$
      .pipe(takeUntil(this.destroy$))
      .subscribe(({ id, config, data }) => {
        if (id !== this.modalId) {
          return;
        }

        this.action = config?.type || '';
        this.handler = config?.handler;
        this.formData = data || undefined;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onClick(action: 'confirm' | 'cancel') {
    if (action === 'cancel') {
      this.modalSrvc.close(this.modalId);
      return;
    }

    if (!this.handler) {
      console.warn('No handler defined for confirm action');
      return;
    }

    this.isDisabled = true;
    this.confirmedActionEmitter.emit({ action: this.action as IConfirmActions, id: this.formData?.['id'] as string, handler: this.handler });
  }
}
