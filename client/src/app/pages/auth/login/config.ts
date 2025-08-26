import { inject } from "@angular/core";
import { AuthApiService } from "../../../core/services/auth/auth-api.service";
import { IFormConfig } from "../../../shared/interfaces/form.interface";
import { ITableActions } from "../../../shared/interfaces/table-config.model";

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
        validators: ['required', 'password'],
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
};

export const forgotPasswordActionConfig: ITableActions<AuthApiService> = {
  forgot_password: {
    enabled: true,
    handler: (email: string) => inject(AuthApiService).forgotPassword(email),
    tooltip: ''
  }
}

export const forgotPasswordFormConfig: IFormConfig = {
  name: 'forgot-password-form',
  moduleName: 'Forgot Password',
  reset: false,
  buildFormOnFirstChange: true,
  fields: [
    {
      type: 'text',
      label: '',
      icon: 'mail',
      container: {
        className: 'w-full'
      },
      field: {
        placeholder: 'Type your email here',
        name: 'email',
        validators: ['required', 'email'],
        type: 'text'
      }
    },
  ],
  actions: [
    {
      value: 'forgot-password',
      label: 'Submit',
      className: 'btn btn-md btn-default'
    }
  ],
}