import { Component, OnInit } from '@angular/core';
import {MatSnackBar, MatSnackBarRef} from '@angular/material';


@Component({
  selector: 'app-edited',
  templateUrl: './edited.component.html',
  styleUrls: ['./edited.component.scss']
})
export class EditedComponent implements OnInit {

  constructor(public _snackBarRef: MatSnackBarRef<EditedComponent>) { }

  ngOnInit() {
  }

  closeSnackBar() {
    this._snackBarRef.dismissWithAction();
  }

}
