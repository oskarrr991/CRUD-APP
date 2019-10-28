import { TranslationService } from './../../services/translation.service';
import {
  TopicHistories,
  TopicHistoryTypes,
  DocTagVersions,
  ContributorTypes,
  Examples,
  Doctags,
  Topics,
  ContributorDeletionReasons,
  Contributors
} from '../../models';
import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PageEvent, MatPaginator, MatSort, MatTableDataSource, MatDialog} from '@angular/material';
import { AppDataService } from '../../services/app-data.service';
import { DoctagDialogComponent, TopicDialogComponent, DoctagVersionsDialogComponent, DeleteTopicDialogComponent } from '../../dialogs';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import {MatSnackBar} from '@angular/material';
import { DeletedComponent } from 'src/app/snackBars/deleted/deleted.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class MainComponent implements AfterViewInit, OnInit { // implements - paveldi

  docTags: Array<Doctags> = [];
  topics: Array<Topics>;
  examples: Array<Examples>;
  contributors: Array<Contributors>;
  contributorDeletionReasons: Array<ContributorDeletionReasons>;
  contributorTypes: Array<ContributorTypes>;
  docTagVersions: Array<DocTagVersions>;
  topicHistoryTypes: Array<TopicHistoryTypes>;
  topicHistories: Array<TopicHistories>;
  filtering: string;
  filterBy = '';

  selectedDoctagId: number;
  selectedDoctagTitle: string = null;
  topicsPageIndex = 0;
  topicsListLength = 100;
  topicsPageSize = 10;
  topicsPageSizeOptions: number[] = [5, 10, 25, 100];
  topicsOrderBy = 'Title';
  topicsSortDirection = 'ASC';

  // topicsDataSource: MatTableDataSource<Topics[]>;
  displayedColumns: string[] = ['Title', 'CreationDate', 'ViewCount', 'Actions'];

  myControl = new FormControl();
  filteredOptions: Observable<Doctags[]>;

  color = 'primary';
  mode = 'indeterminate';
  value = 50;

  str = 'hello world';
  // dependencies motodos naudojam savo klaseje
  constructor(private _router: Router,
              private _appDataService: AppDataService,
              private _dialog: MatDialog,
              private _activatedRoute: ActivatedRoute,
              private _titleService: Title,
              public _trans: TranslationService,
              private _snackBar: MatSnackBar) {
  }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    // const arr = this.str.split(' ');
    // // tslint:disable-next-line:one-variable-per-declaration
    // let asci, f, l, endWord, res;
    // for (const word of arr) {
    //   word.split('');
    //   f = word[word.length - 1];
    //   l = word[1];
    //   asci = word[0].charCodeAt(0);
    //   endWord = asci + f + word.substring(2, word.length - 1) + l;
    // }

    this._appDataService.getDoctags()
      .then(data => {
        this.docTags = data;

        const doctagTitle = this._activatedRoute.snapshot.params['doctagTitle'];
        if (doctagTitle) {
          this.selectedDoctagTitle = doctagTitle;
          this._titleService.setTitle(this.selectedDoctagTitle + ' -Stack Overflow dump');
          const doctagId = this.docTags.find(x => x.Title === doctagTitle).Id;
          this.selectedDoctagId = doctagId;
          this._appDataService.getTopicsCount(doctagId).then(data => {
            this.topicsListLength = data[0].Count;
          });
          // tslint:disable-next-line:max-line-length
          this._appDataService.getTopics(doctagId, 0, this.topicsPageSize, this.topicsOrderBy, this.topicsSortDirection, this.filterBy).then(topics => {
            this.topics = topics;
            // this.topicsDataSource = this.topics;
          });
        }
      })
      .then(data => {
        this.filteredOptions = this.myControl.valueChanges
          .pipe(
            startWith<string | Doctags>(''),
            map(value => typeof value === 'string' ? value : value.Title),
            map(name => name ? this._filter(this.docTags, name) : this.docTags.slice())
          );
      });
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe((sortData: { active: string; direction: string; }) => {
      console.log(sortData);
      this.topicsOrderBy = sortData.active;
      this.topicsSortDirection = sortData.direction;
      // tslint:disable-next-line:max-line-length
      this._appDataService.getTopics(this.selectedDoctagId, 0, this.topicsPageSize, this.topicsOrderBy, this.topicsSortDirection, this.filterBy)
        .then(data => {
          this.topicsPageIndex = 0;
          this.topics = data;
        });
    });
  }

  public displayFn(user?: Doctags): string | undefined {
    return user ? user.Title : undefined;
  }

  private _filter(data: Array<Doctags>, name: string): Doctags[] {
    const filterValue = name.toLowerCase();
    return data.filter(option => option.Title.toLowerCase().indexOf(filterValue) === 0);
  }

  public applyFilter(filterStr: string) {
    this.filterBy = filterStr;
    this.ngOnInit();
    console.log(this.filterBy);

    // this.allTopics.filter = filterBy.trim().toLowerCase();
  }

  public async onTopicsPageChange(event?: PageEvent): Promise<void> {
    const from = event.pageSize * event.pageIndex;
    this.topicsPageIndex = event.pageIndex;
    // tslint:disable-next-line:max-line-length
    return this._appDataService.getTopics(this.selectedDoctagId, from, event.pageSize, this.topicsOrderBy, this.topicsSortDirection, this.filterBy)
      .then(data => {

        this.topics = data;
      });
  }

  public showTopic(event: any): void {
    const docTagId = event.option.value.Id;
    this.selectedDoctagId = docTagId;

    this.selectedDoctagTitle = this.docTags.find(x => x.Id === docTagId).Title;
    this._titleService.setTitle(this.selectedDoctagTitle + ' -Stack Overflow dump');
    this._router.navigateByUrl(`${this.selectedDoctagTitle}`);
    this._appDataService.getTopicsCount(docTagId).then(data => {
      this.topicsListLength = data[0].Count;
    });

    this._appDataService.getTopics(docTagId, 0, this.topicsPageSize, this.topicsOrderBy, this.topicsSortDirection, this.filterBy)
      .then(data => {
        this.topicsPageIndex = 0;
        this.topics = data;
        this.docTagVersions = null;
        this.examples = null;
        console.log(data);
      });
  }

  public navigateToTopic(topicId: string): void {
    this._router.navigateByUrl(`${this.selectedDoctagTitle}/${topicId}`);
    this._titleService.setTitle(this.selectedDoctagTitle + '/' + topicId + ' -Stack Overflow dump');
  }

  public showDoctagVersions(event: any): Promise<DocTagVersions[]> {
    return this._appDataService.getDoctagVersions(event);
  }

  public showContributors(DocExampleId: number): void {
    this._appDataService.getContributors(DocExampleId)
      .then(data => {
        console.log(data);
        const example = this.examples.find(x => x.Id === DocExampleId);
        example.Contributors = data;
      });
  }

  public showDoctagFormDialog() {
    const dialogRef = this._dialog.open(DoctagDialogComponent, {
      data: { name: 'test', animal: 'dog' }
    });

    dialogRef.afterClosed()
      .subscribe(result => {
        if (!result) { return; } else {
          this._appDataService.addDoctag(result).subscribe(data => {
            console.log('Inserted topic:');
            console.log(data);
          });
        }
      });
  }

  public showTopicFormDialog() {
    const dialogRef = this._dialog.open(TopicDialogComponent, {
      data: { name: 'test', animal: 'dog' },
      width: '92vw'
    });

    dialogRef.afterClosed()
      .subscribe(result => {
        if (!result) { return; } else {
          result.docTagId = this.selectedDoctagId;
          this._appDataService.addTopic(result)
            .subscribe(data => {
            console.log('Inserted topic:');
            console.log(data);
            //
          });
        }
      });
  }

  public openDoctagversionsDialog(event: string) {
    this._dialog.open(DoctagVersionsDialogComponent, {data: event});
  }

  public confirmTopicDelete(topicId: number): void{
    this._dialog.open(DeleteTopicDialogComponent, {data: {topicId}});
  }

  public deleteTopic(topicId: number) {
    this._appDataService.deleteTopic(topicId)
      .then(data => {
        console.log('Deleted topic:' + data);
      });
  }

  public toHumanDate(date: string): Date {
    if (!date || date.length < 10) { return; }
    const partOne = date.split('(')[1];
    const partTwo = Number(partOne.split('-')[0]);
    const dateObj = new Date(partTwo);
    return dateObj;
  }

  changeLang(lang: string) {
    this._trans.lang = lang;
  }

  holdHandler(e: number, topicId: number) {
    console.log(e);
    if (e >= 800) {
      this.deleteTopic(topicId);
      this.openSnackBar();
    } else {
      return;
    }
  }

  openSnackBar() {
    this._snackBar.openFromComponent(DeletedComponent, {
      duration: 3000
    });
  }

}
