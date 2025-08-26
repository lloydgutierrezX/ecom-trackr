import { IFormConfig } from "../../../shared/interfaces/form.interface";

export const formConfig: IFormConfig = {
  name: 'auth-form',
  moduleName: 'auth',
  reset: false,
  buildFormOnFirstChange: true,
  fields: [
    {
      type: 'password',
      label: 'Password',
      icon: 'key-round',
      container: {
        className: 'w-full'
      },
      field: {
        name: 'password',
        placeholder: '',
        validators: ['required', 'password'],
        type: 'password',
      }
    },
    {
      type: 'password',
      label: 'Confirm Password',
      icon: 'key-round',
      container: {
        className: 'w-full'
      },
      field: {
        name: 'confirm-password',
        placeholder: '',
        validators: ['required', 'password', 'match:password'],
        type: 'password',
      }
    },
  ],
  actions: [
    {
      value: 'reset_password',
      label: 'Submit',
      className: 'btn btn-md'
    },
  ],
};



