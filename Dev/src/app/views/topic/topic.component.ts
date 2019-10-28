import { MatSnackBar } from '@angular/material/snack-bar';
import { DeletedComponent } from './../../snackBars';
import { AppDataService } from '../../services/app-data.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Examples } from '../../models';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material';
import { ExamplesDialogComponent, EditExampleDialogComponent } from '../../dialogs';
import { Injectable } from '@angular/core';
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';
import { ScrollEvent } from 'ngx-scroll-event';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss']
})
@Injectable()
export class TopicComponent implements OnInit {

  examples: Array<Examples>;
  topicTitle: string;
  topicId: number;
  panelOpenState = false;
  firstExampleId: number;
  topicHistories: string;

  color = 'primary';
  mode = 'indeterminate';
  value = 50;

  windowScrolled = false;

  constructor(private _activatedRoute: ActivatedRoute, // angular service
    private _appDataService: AppDataService,
    private _dialog: MatDialog, // service to opne material design
    private _scrollToService: ScrollToService,
    private _snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.topicId = this._activatedRoute.snapshot.params.topicId;
    this.downloadTopic(this.topicId);
    this.downloadExamples(this.topicId);
    window.scrollTo(0, 0);
  }

  private downloadTopic(topicId: number): Subscription {
    return this._appDataService.getTopic(topicId).subscribe(topic => {
      this.topicTitle = topic.Title;
    });
  }

  private async downloadExamples(topicId: number): Promise<void> {
    return this._appDataService.getExamples(topicId)
      .then(data => {
        this.examples = data;
        this.firstExampleId = data[0].Id;
        console.log(data);
      });
  }

  public showExampleFormDialog(): void {
    const dialogRef = this._dialog.open(ExamplesDialogComponent, {
      data: { name: 'test', animal: 'dog' }
    });

    dialogRef.afterClosed()
      .subscribe(result => {
        if (!result) { return; } else {
          result.docTopicId = this.topicId;
          this._appDataService.addExample(result).subscribe(data => {
            console.log('Inserted example:');
            console.log(data);
          });
        }
      });
  }

  public triggerScrollTo(): void {
    const config: ScrollToConfigOptions = {
      target: 'top'
    };
    this._scrollToService.scrollTo(config);
  }


  public handleScroll(event: ScrollEvent): void {
    this.windowScrolled = true;
    if (event.isReachingTop) {
      this.windowScrolled = false;
    }
  }

  public showTopicHistories(id: number): void {
    this._appDataService.getTopicHistories(id)
      .then(data => {
        console.log(data);
        this.topicHistories = '';
        data.forEach(x => {
          if (!x.Text) {
            this.topicHistories += '';
          } else {
            this.topicHistories += `${x.Name}: ${x.Text}`;
          }
        });
        return this.topicHistories;
      });
  }

  public getHistory(): void {
    this.showTopicHistories(this.topicId);
  }

  public deleteExample(id: number): void {
    this._appDataService.deleteExample(id)
      .then(data => {
        console.log('Deleted example' + data);
      });
  }

  public editExamples(exampleId: number, exampleTitle: string, exampleBody: string, exampleMarkdown: string): void {
    const dialogRef = this._dialog.open(EditExampleDialogComponent,
      { data: { exampleId, exampleTitle, exampleBody, exampleMarkdown } });

    console.log(exampleId);
    dialogRef.afterClosed()
      .subscribe(result => {
        if (!result) { return; } else {
          this._appDataService.editExample(exampleId, result).subscribe(data => {
            console.log('Example edited:');
            console.log(data);
          });
        }
      });
}


  openSnackBar() {
    this._snackBar.openFromComponent(DeletedComponent, {
      duration: 3000
    });
  }

  holdHandler(e: number, exampleId: number) {
    console.log(e);
    if (e >= 800) {
      this.deleteExample(exampleId);
      this.openSnackBar();
    } else {
      return;
    }
  }
}
