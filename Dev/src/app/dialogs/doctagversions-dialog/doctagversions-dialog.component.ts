import { DocTagVersions } from './../../models';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppDataService } from '../../services/app-data.service';

@Component({
  selector: 'app-doctagversions-dialog',
  templateUrl: './doctagversions-dialog.component.html',
  styleUrls: ['./doctagversions-dialog.component.scss']
})
export class DoctagVersionsDialogComponent implements OnInit {

  docTagVersions: DocTagVersions[] = [];

  constructor(
    public dialogRef: MatDialogRef<DoctagVersionsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _appDataService: AppDataService) { }


  ngOnInit() {
    console.log(this.data + ' test');
    this.showDoctagVersions(this.data);
  }

  public showDoctagVersions(event: any): void {
    this._appDataService.getDoctagVersions(event)
      .then(data => {
        this.docTagVersions = data;
      });
  }

  public toHumanDate(date: string): Date {
    const partOne = date.split('(')[1];
    const partTwo = Number(partOne.split('-')[0]);
    const dateObj = new Date(partTwo);
    return dateObj;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
