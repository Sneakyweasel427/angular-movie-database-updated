import { Component, inject, OnInit, TemplateRef } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {NgComponentOutlet, NgTemplateOutlet} from "@angular/common";
import {
  UntypedFormControl,
  UntypedFormGroup,
  AbstractControl,
  ReactiveFormsModule,
  UntypedFormBuilder
} from '@angular/forms';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {MapPipe} from "../pipes/map.pipe";
import {DialogButton, DialogData} from "./dialog.interface";

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    NgComponentOutlet,
    NgTemplateOutlet,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MapPipe
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent implements OnInit {
  private dialogRef = inject(MatDialogRef<DialogComponent>);
  public data: DialogData = inject(MAT_DIALOG_DATA);
  public fb = inject(UntypedFormBuilder);

  errorMessage = '';

  isTemplateRef = false;
  form: UntypedFormGroup = new UntypedFormGroup({});

  ngOnInit() {
    if (this.data.content instanceof TemplateRef) {
      this.isTemplateRef = true;
    }

    if (this.data.inputs) {
      this.data.inputs.forEach((input) => {
        this.form.addControl(input.name, new UntypedFormControl(input.value  || '', input.validators || []));
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onButtonClick(button: DialogButton) {
    if (button.role === 'submit' && this.form.invalid) {
      this.form.markAllAsTouched();
      this.form.updateValueAndValidity();
      return;
    }

    const values = this.getValues();
    const handlerResponse = this.callButtonHandler(button, button.role === 'submit' ? values : undefined);

    if (button.role === 'cancel') { return this.dialogRef.close(); }
    if (handlerResponse !== false) {
      this.dialogRef.close({ values, ...handlerResponse as {} });
    }
  }

  isRequiredInput(controlName: string) {
    const formControl = this.form.get(controlName);
    if (!formControl.validator) {
      return false;
    }

    const validator = formControl.validator({} as AbstractControl);
    return (validator && validator.required);
  }

  private callButtonHandler(button: DialogButton, values: any) {
    if (button.handler) {
      return button.handler(values);
    }
    return {};
  }

  private getValues() {
    if (!this.data.inputs || this.data.inputs.length === 0) {
      return undefined;
    }
    return this.form.value;
  }

}
