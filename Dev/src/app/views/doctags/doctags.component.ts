import { Component, OnInit } from '@angular/core';

export interface Doctags {
  doctags: [{
    Id: number;
    Tag: string;
    Title: string;
    CreationDate: string;
    HelloWorldDocTopicId: number;
    TopicCount: string;
  }];
}

@Component({
  selector: 'app-doctags',
  templateUrl: './doctags.component.html',
  styleUrls: ['./doctags.component.scss']
})
export class DoctagsComponent implements OnInit {

  selectedTopic: number;
  docTags: Doctags;

  constructor() { }

  ngOnInit() {
  }

}
