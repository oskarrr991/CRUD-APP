import { EditExampleData } from './../../models/EditExampleData';
import { AddedComponent } from './../../snackBars/added/added.component';
import { Component, Inject, OnInit, NgZone, ViewChild } from '@angular/core'; // Čia pridėjau papildomai
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms'; // Turbūt nereikia, jei Validatorių nededam
import {MatSnackBar, MatSnackBarRef} from '@angular/material';
import { EditedComponent } from './../../snackBars/edited/edited.component';
import { AppDataService } from '../../services/app-data.service';
import {MatInputModule} from '@angular/material/input'; // Kad naudoti text-area
import {CdkTextareaAutosize} from '@angular/cdk/text-field'; // Kad resizinti text-area laukelį


@Component({
  selector: 'app-edit-example-dialog',
  templateUrl: './edit-example-dialog.component.html',
  styleUrls: ['./edit-example-dialog.component.scss']
})
export class EditExampleDialogComponent implements OnInit {

  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  editExampleForm: FormGroup;

  constructor(
    private _appDataService: AppDataService,
    public dialogRef: MatDialogRef<EditExampleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EditExampleData, // data(iš Topic): EditExampleData(type:model/interface)
    private _snackBar: MatSnackBar,
    private _ngZone: NgZone ) { }

  ngOnInit() {
    this.createExampleForm();
  }

  private createExampleForm() {
    this.editExampleForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20) ]),
      bodyHtml: new FormControl('', [Validators.required, Validators.minLength(3) ]),
      bodyMarkdown: new FormControl('', [Validators.required, Validators.minLength(3) ]),
    });
  }

  public submitEditExample() {
    this.onNoExampleFormClick();
    this.openSnackBar();
  }

  onNoExampleFormClick(): void {
    this.dialogRef.close(this.editExampleForm.value);
  }

  public closeEditExampleDialog(): void {
    this.dialogRef.close();
  }

  openSnackBar() {
    this._snackBar.openFromComponent(EditedComponent, {
      duration: 3000
    });
  }

}
