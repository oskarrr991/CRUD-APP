import { Component, OnInit } from '@angular/core';
import {MatSnackBar, MatSnackBarRef} from '@angular/material';

@Component({
  selector: 'app-deleted',
  templateUrl: './deleted.component.html',
  styleUrls: ['./deleted.component.scss']
})
export class DeletedComponent implements OnInit {

  constructor(public _snackBarRef: MatSnackBarRef<DeletedComponent>) { }

  ngOnInit() {
  }

  closeSnackBar() {
    this._snackBarRef.dismissWithAction();
  }

}
