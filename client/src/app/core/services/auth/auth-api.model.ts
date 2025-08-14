export type IAuthAction =
  'login' | 'logout' | 'register' | 'forgot-password' | 'reset-password' | 'redirect';
export interface ILoginAuthForm {
  email: string;
  password: string;
}

export interface IRegisterAuthForm {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IAuthResponse {
  token: string;
  user: {
    id: number;
    email: string;
    name: string;
  };
}

// export type ICreateClientPayload = Omit<IClient, 'id' | 'createdAt' | 'updatedAt'>;
