import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ModalService } from '../../../../services/modal/modal.service';
import { BaseModalComponent } from '../../base-modal.component';
import { DynamicFormComponent } from "../../../forms/dynamic-form.component";
import { IFormConfig, IFormData } from '../../../../interfaces/form.interface';
import { Observable, Subject, take, takeUntil } from 'rxjs';
import { FormService } from '../../../../services/form/form.service';

@Component({
  selector: 'app-form-modal',
  standalone: true,
  imports: [BaseModalComponent, DynamicFormComponent],
  templateUrl: './form-modal.component.html'
})
export class FormModalComponent implements OnInit, OnDestroy {
  @Input() modalId: 'form-modal' = 'form-modal';

  @ViewChild(DynamicFormComponent)
  formComponent!: DynamicFormComponent

  handler!: <T>(payload: T) => Observable<T>;
  config!: IFormConfig;
  formData?: IFormData;
  resetForm: boolean = false;

  private destroy$ = new Subject<void>();

  title: string = '';

  constructor(
    private modalSrvc: ModalService,
    private formSrvc: FormService
  ) { }

  ngOnInit(): void {
    this.modalSrvc.onOpen$
      .pipe(takeUntil(this.destroy$))
      .subscribe(({ id, config, data }) => {
        if (id !== this.modalId) {
          return;
        }

        const { formConfig, handler } = config;

        this.handler = handler;
        this.config = formConfig;
        this.formData = data ?? undefined;
        this.resetForm = true;

        this.title = (data ? 'Update ' : 'Add ') + this.config.moduleName;
      });

    this.modalSrvc.onClose$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.resetForm = false);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onClick(type: string): void {
    if (type === 'close') {
      this.modalSrvc.close(this.modalId);
    }

    if (type === 'save') {
      const formGroup = this.formComponent?.formGroup;
      if (!formGroup || formGroup.invalid) {
        formGroup?.markAllAsTouched();
        return;
      }

      const payload = this.formComponent?.formData;
      const id = (this.formData?.['id'] as string) || null;
      this.formSrvc.onSave(id, payload, this.handler)
        .subscribe((result) => {
          if (result && !result['error']) {
            this.modalSrvc.close(this.modalId);
          }
        });
    }
  }
}
