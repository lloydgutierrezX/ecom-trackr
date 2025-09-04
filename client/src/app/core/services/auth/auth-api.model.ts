export type IAuthAction =
  'login' | 'logout' | 'register' | 'forgot-password' | 'reset-password' | 'redirect';

export interface ILoginAuthForm {
  email: string;
  password: string;
}

export interface IForgotPassword {
  email: string;
}

export interface IForgotPasswordResponse {
  success: boolean,
  message: string
}

export interface IResetPassword {
  password: string;
}

export interface IRegisterAuthForm {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IVerifyEmail {
  token: string;
}

export interface IVerifyEmailResponse {
  message: string;
}

export interface IAuthRegisterResponse {
  message: string;
  userId: string;
}

export interface IAuthResponse {
  message: string;
  accessToken: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

// export type ICreateClientPayload = Omit<IClient, 'id' | 'createdAt' | 'updatedAt'>;
