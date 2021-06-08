import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TermDialogActions } from '../glossary-table/glossary-table.component';
import { GlossaryTerm } from '../glossary.model';

interface DialogData {
  action: TermDialogActions;
  glossaryTerm?: GlossaryTerm;
};

@Component({
  selector: 'app-add-new-term-dialog',
  templateUrl: './add-new-term-dialog.component.html',
  styleUrls: ['./add-new-term-dialog.component.scss']
})
export class AddNewTermDialogComponent implements OnInit {
  termForm: FormGroup;
  ActionEnum = TermDialogActions;
  definitionErrorMsg: string = '';
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, private fb: FormBuilder, public dialogRef: MatDialogRef<AddNewTermDialogComponent>,) {
    this.termForm = this.fb.group({
      term: [null, [
        Validators.required,
        this.noWhitespaceValidator
      ]],
      definition: [null, [
        Validators.required,
        this.noWhitespaceValidator,
        Validators.maxLength(256)
      ]],
    });
  }

  ngOnInit(): void {
    if (this.data.action === TermDialogActions.Edit) {
      this.termForm = this.fb.group({
        term: [this.data.glossaryTerm!.term, [
          Validators.required,
          this.noWhitespaceValidator
        ]],
        definition: [this.data.glossaryTerm!.definition, [
          Validators.required,
          this.noWhitespaceValidator,
          Validators.maxLength(256)
        ]],
      });
    }
  }

  submit(): void {
    if (this.termForm.valid) {
      this.dialogRef.close({
        newTerm: {
          term: this.termForm.get('term')!.value,
          definition: this.termForm.get('definition')!.value
        }
      });
    }

  }

  noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

  onCancel(): void {
    this.dialogRef.close();
  }


}
