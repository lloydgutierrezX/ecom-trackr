import { IFormConfig } from "../../../shared/interfaces/form.interface";


export const formConfig: IFormConfig = {
  name: 'auth-form',
  moduleName: 'auth',
  reset: false,
  buildFormOnFirstChange: true,
  fields: [
    {
      type: 'text',
      label: 'Email',
      container: {
        className: 'w-full'
      },
      icon: 'mail',
      field: {
        name: 'email',
        validators: ['required', 'email'],
        type: 'text'
      }
    },
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
        validators: ['required', 'password', 'match:password'],
        type: 'password',
      }
    },
  ],
  actions: [
    {
      value: 'register',
      label: 'Register',
      className: 'btn btn-md'
    },
    {
      value: 'forgot-password',
      label: 'Forgot Password',
      className: 'btn btn-md'
    },
    {
      value: 'Login',
      label: 'Login',
      className: 'btn btn-md btn-primary'
    },
  ],
}