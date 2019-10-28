import { Component, OnInit } from '@angular/core';
import {MatSnackBar, MatSnackBarRef} from '@angular/material';

@Component({
  selector: 'app-added',
  templateUrl: './added.component.html',
  styleUrls: ['./added.component.scss']
})
export class AddedComponent implements OnInit {

  constructor(public _snackBarRef: MatSnackBarRef<AddedComponent>) { }

  ngOnInit() {
  }

  closeSnackBar() {
    this._snackBarRef.dismissWithAction();
  }

}
