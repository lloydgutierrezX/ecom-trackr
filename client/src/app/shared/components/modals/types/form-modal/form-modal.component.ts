import { Component, Input } from '@angular/core';
import { ModalService } from '../../../../services/modal/modal.service';
import { BaseModalComponent } from '../../base-modal.component';
import { DynamicFormComponent } from "../../../forms/dynamic-form.component";
import { IFormConfig } from '../../../../interfaces/form.interface';

@Component({
  selector: 'app-form-modal',
  standalone: true,
  imports: [BaseModalComponent, DynamicFormComponent],
  templateUrl: './form-modal.component.html'
})
export class FormModalComponent {
  @Input() modalId: string = 'form-modal';
  formFields!: IFormConfig;

  constructor(private modalSrvc: ModalService) {
    this.modalSrvc.onOpen$.subscribe(({ id, data }) => {
      if (id !== this.modalId) {
        return;
      }

      this.formFields = data;
    })
  }
}
