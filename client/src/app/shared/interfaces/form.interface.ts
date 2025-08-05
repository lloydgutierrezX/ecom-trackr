export type IFormIDs = 'form-modal' | 'alert-modal' | 'confirm-modal';

export type IFormData = Record<string, string | number | boolean | null>;

export interface IFormConfig {
  name: string; // form name
  moduleName: string;
  reset: boolean;
  fields: IFormFields[]; // form fields[]
  actions: {
    value: string;
    label: string;
    className?: string;
  }[]
}

export type IFormFields =
  | IDefaultInputField
  | IEmailInputField
  | ITelInputField
  | IDateTimeInputField
  | ISelectField
  | ITextAreaField
  | IToggleField
  | ICheckBoxField;

interface IDefaultField {
  name: string;
  validators?: string[];
  placeholder?: string;
  autoComplete?: 'on' | 'off';
  readonly?: boolean;
  disabled?: boolean;
}

interface IBaseFormField {
  label: string;
  hint?: string;
  container?: {
    className?: string;
    cssStyle?: string;
  };
}

type IDefaultInputType = 'text' | 'number' | 'password';
interface IDefaultInputField extends IBaseFormField {
  type: IDefaultInputType;
  field: IDefaultField & {
    type: IDefaultInputType,
    defaultValue?: string
    min?: number;
    max?: number;
    maxLength?: number;
    step?: number;
  };
}

interface IEmailInputField extends IBaseFormField {
  type: 'email';
  field: IDefaultField & {
    defaultValue: string;
  }
}

interface ITelInputField extends IBaseFormField {
  type: 'tel';
  field: IDefaultField & {
    type: string;
    defaultValue?: string;
  }
}

interface IDateTimeInputField extends IBaseFormField {
  type: 'date' | 'time';
  field: IDefaultField & {
    defaultValue?: string;
  }
}

interface ITextAreaField extends IBaseFormField {
  type: 'textarea';
  field: IDefaultField & {
    type: 'text';
    defaultValue: string;
    maxLength?: number;
  };
}

interface ISelectField extends IBaseFormField {
  type: 'select';
  field: IDefaultField & {
    defaultValue: string | number | boolean;
    options: { label: string, value: string | number | boolean; }[];
  };
}

interface IToggleField extends IBaseFormField {
  type: 'toggle';
  field: IDefaultField & {
    defualtValue: boolean | 0 | 1;
  };
}

interface ICheckBoxField extends IBaseFormField {
  type: 'checkbox';
  field: IDefaultField & {
    defaultValue: boolean | 0 | 1;
  };
}