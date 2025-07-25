import { Component, Input } from '@angular/core';
import { ModalService } from '../../../../services/modal/modal.service';
import { BaseModalComponent } from '../../base-modal.component';
import { DynamicFormComponent } from "../../../forms/dynamic-form.component";
import { IFormConfig, IFormData } from '../../../../interfaces/form.interface';

@Component({
  selector: 'app-form-modal',
  standalone: true,
  imports: [BaseModalComponent, DynamicFormComponent],
  templateUrl: './form-modal.component.html'
})
export class FormModalComponent {
  @Input() modalId: string = 'form-modal';

  config!: IFormConfig;
  formData?: IFormData;

  title: string = '';

  constructor(private modalSrvc: ModalService) {
    this.modalSrvc.onOpen$.subscribe(({ id, config, data }) => {
      if (id !== this.modalId) {
        return;
      }

      this.config = config;
      this.formData = data ?? undefined;

      this.title = data ? 'Update ' : 'Add ' + this.config.moduleName;
    })
  }

  onClick(type: string): void {
    // call form service
  }
}
