import { Component, OnInit, Inject } from '@angular/core';
import { AppDataService } from '../../services/app-data.service';
import { Subscription } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TopicDialogData } from '../../models';
import {MatSnackBar} from '@angular/material';
import { DeletedComponent } from 'src/app/snackBars/deleted/deleted.component';


@Component({
  selector: 'app-delete-topic-dialog',
  templateUrl: './delete-topic-dialog.component.html',
  styleUrls: ['./delete-topic-dialog.component.scss']
})
export class DeleteTopicDialogComponent implements OnInit {

  topicTitle: string;

  constructor(private _appDataService: AppDataService,
              public dialogRef: MatDialogRef<DeleteTopicDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: TopicDialogData,
              private _snackBar: MatSnackBar ) { }

  ngOnInit() {
    this.downloadTopic(this.data.topicId);
  }

  public deleteTopic(id: number): void {
    this._appDataService.deleteTopic(id)
      .then(data => {
        console.log('Deleted topic:' + data);
      });
    this.closeTopicDeleteDialog();
    this.openSnackBar();
  }

  public downloadTopic(topicId: number): Subscription {
    return this._appDataService.getTopic(topicId).subscribe(topic => {
      this.topicTitle = topic.Title;
    });
  }

  public closeTopicDeleteDialog(): void {
    this.dialogRef.close();
  }

  openSnackBar() {
    this._snackBar.openFromComponent(DeletedComponent, {
      duration: 3000
    });
  }

}
