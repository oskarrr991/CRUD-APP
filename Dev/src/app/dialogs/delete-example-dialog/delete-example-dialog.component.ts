import { DeletedComponent } from './../../snackBars/deleted/deleted.component';
import { ExampleDialogData } from './../../models/exampleDialogData.model';
import { Component, OnInit, Inject } from '@angular/core';
import { AppDataService } from '../../services/app-data.service';
import { Subscription } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {MatSnackBar, MatSnackBarRef} from '@angular/material';


@Component({
  selector: 'app-delete-example-dialog',
  templateUrl: './delete-example-dialog.component.html',
  styleUrls: ['./delete-example-dialog.component.scss']
})
export class DeleteExampleDialogComponent implements OnInit {

  constructor(private _appDataService: AppDataService,
              public dialogRef: MatDialogRef<DeleteExampleDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ExampleDialogData,
              private _snackBar: MatSnackBar, ) { }

  ngOnInit() {
  }

  public deleteExample(id: number): void {
    this._appDataService.deleteExample(id)
      .then(data => {
        console.log('Deleted topic:' + data);
      });
  }

  public closeExampleDeleteDialog(): void { //ideti po funkcija this.closeExampleBla bla
    this.dialogRef.close();
  }

  openSnackBar() {
    this._snackBar.openFromComponent(DeletedComponent, {
      duration: 3000
    });
  }

}
