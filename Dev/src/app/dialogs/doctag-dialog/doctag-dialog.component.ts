import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {MatSnackBar, MatSnackBarRef} from '@angular/material';
import { AddedComponent } from 'src/app/snackBars/added/added.component';

@Component({
  selector: 'app-doctag-dialog',
  templateUrl: './doctag-dialog.component.html',
  styleUrls: ['./doctag-dialog.component.scss']
})
export class DoctagDialogComponent implements OnInit {

  doctagForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DoctagDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar) { }


  ngOnInit() {
    this.createDoctagForm();
  }


  private createDoctagForm() {
    this.doctagForm = new FormGroup({
      // tslint:disable-next-line
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20) ]),
      tag: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20) ]),
    });
  }

  public submitDoctag() {
    console.log(this.doctagForm.value);
    this.onNoDoctagFormClick();
    this.openSnackBar();
  }

  onNoDoctagFormClick(): void {
    this.dialogRef.close(this.doctagForm.value);
  }
  closeDocDial() {
    this.dialogRef.close();
  }

  openSnackBar() {
    this._snackBar.openFromComponent(AddedComponent, {
      duration: 3000
    });
  }
}
