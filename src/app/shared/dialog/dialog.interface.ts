import { AbstractControlOptions, ValidatorFn } from '@angular/forms';

export type DIALOG_BUTTON_ROLE_CANCEL = 'cancel';
export type DIALOG_BUTTON_ROLE_SUBMIT = 'submit';

export interface DialogData {
  header?: string;
  subHeader?: string;
  content?: any;
  buttons?: DialogButton[];
  inputs?: DialogInput[];
  disableCloseBtn?: boolean;
}

export interface DialogButton {
  text: string;
  color: string;
  role?: DIALOG_BUTTON_ROLE_CANCEL | DIALOG_BUTTON_ROLE_SUBMIT;
  cssClass?: string | string[];
  disabled?: boolean;
  handler?: (value?: any) => boolean | void | {[key: string]: any};
}

export interface DialogInput {
  name: string;
  type?: string;
  id?: string;
  value?: string;
  placeholder?: string;
  validators: ValidatorFn | ValidatorFn[] | AbstractControlOptions;
  options?: { label: string, value: any }[];
}
