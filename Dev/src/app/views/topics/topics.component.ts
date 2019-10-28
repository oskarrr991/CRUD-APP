import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
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
import { AppDataService } from '../../services/app-data.service';
import { PageEvent } from '@angular/material';


@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss']
})
export class TopicsComponent implements OnInit {

  // topics: Topics;
  // examples: Examples;
  // docTagVersions: DocTagVersions;
  // docTags: Doctags;
  // selectedTopic: number;

  // selectedTopicTitle: string = null;
  // topicsPageIndex: number = null;
  // topicsListLength = 100;
  // topicsPageSize = 10;
  // topicsPageSizeOptions: number[] = [5, 10, 25, 100];

  // displayedColumns: string[] = ['Title', 'CreationDate', 'ViewCount', 'MoreButton'];

  constructor(private _http: HttpClient, private _router: Router, private _appDataService: AppDataService) { }

  ngOnInit() {
  }
  
  // public showTopic(docTagId: any, topicsFrom: number, topicsTo: number) {
  //   // this._router.navigateByUrl(`${event}`);
  //   this.selectedTopicTitle = this.docTags.find(x => x.Id === docTagId).Title;

  //   this._appDataService.getTopicsCount(docTagId).then(data => {
  //     this.topicsListLength = data.result[0].Count;
  //   });

  //   // this._appDataService.getTopics(docTagId, 0, this.topicsPageSize)
  //   //   .then(data => {
  //   //     this.topicsPageIndex = 0;
  //   //     this.topics = data;
  //   //     this.docTagVersions = null;
  //   //     this.examples = null;
  //   //     console.log(data);
  //   //   });
  // }

  // public onTopicsPageChange(event?: PageEvent) {
  //   const from = event.pageSize * event.pageIndex;
  //   this.topicsPageIndex = event.pageIndex;
  //   // this._appDataService.getTopics(this.selectedTopic, from, event.pageSize).then(data => {
  //   //   this.topics = data;
  //   // });
  // }

  // toHumanDate(date: string): Date {
  //   const partOne = date.split('(')[1];
  //   const partTwo = Number(partOne.split('-')[0]);
  //   const dateObj = new Date(partTwo);
  //   return dateObj;
  // }

}
