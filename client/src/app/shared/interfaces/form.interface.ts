interface IDefaultField {
  name: string;
  validators?: string[];
  placeholder?: string;
  autoComplete?: 'on' | 'off';
  readonly?: boolean;
}

interface IBaseFormField {
  label: string;
  container?: {
    className: string;
    cssStyle: string;
  };
}



type IInputType = 'text' | 'number' | 'email' | 'password' | 'tel' | 'url' | 'date' | 'time';
interface IInput extends IDefaultField {
  inputType: IInputType;
  defaultValue?: string | number;
  min?: number;
  max?: number;
  maxLength?: number;
}

interface IInputField extends IBaseFormField {
  type: IInputType;
  field: IInput;
}



interface ITextArea extends IDefaultField {
  defaultValue?: string;
  min?: number;
  max?: number;
  maxLength?: number;
}

interface ITextAreaField extends IBaseFormField {
  type: 'textarea';
  field: ITextArea;
}



interface ISelect extends IDefaultField {
  defaultValue: string | number | boolean;
  options: { label: string, value: string | number | boolean; }[]
}

interface ISelectField extends IBaseFormField {
  type: 'select';
  field: ISelect;
}




interface IToggle extends IDefaultField {
  defualtValue: boolean | 0 | 1;
}

interface IToggleField extends IBaseFormField {
  type: 'toggle';
  field: IToggle;
}



interface ICheckBox extends IDefaultField {
  defaultValue: boolean | 0 | 1;
}

interface ICheckBoxField extends IBaseFormField {
  type: 'checkbox';
  field: ICheckBox;
}

export type IFormFields =
  | IInputField
  | ISelectField
  | ITextAreaField
  | IToggleField
  | ICheckBoxField;

export interface IFormConfig {
  name: string;
  fields: IFormFields[];
}
