import { IFormConfig } from "../../../shared/interfaces/form.interface";

export const formConfig: IFormConfig = {
  name: 'auth-form',
  moduleName: 'auth',
  reset: false,
  buildFormOnFirstChange: true,
  fields: [
    {
      type: 'text',
      label: 'Name',
      icon: 'user-round',
      container: {
        className: 'w-full'
      },
      field: {
        name: 'name',
        validators: ['required'],
        type: 'text'
      }
    },
    {
      type: 'text',
      label: 'Email',
      icon: 'mail',
      container: {
        className: 'w-full'
      },
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