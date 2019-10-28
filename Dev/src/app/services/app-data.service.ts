import { Observable } from 'rxjs';
import {  TopicHistories,
  DocTagVersions,
  Examples,
  Doctags,
  Topics,
  Contributors,
  TopicsData,
  ExamplesData,
  EditExampleData } from '../models';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppDataService {

  constructor(private _http: HttpClient) { }

  public addDoctag(data: {name: string, tag: string}) {
    const url = 'http://localhost:1337/Doctags';
    return this._http.post<any>(url, data);
  }

  public addTopic(data: TopicsData) {
    const url = 'http://localhost:1337/Topics';
    return this._http.post<any>(url, data);
  }

  public addExample(data: ExamplesData) {
    const url = 'http://localhost:1337/Examples';
    return this._http.post<any>(url, data);
  }

  public getDoctags(): Promise<Array<Doctags>> {
    const url = 'http://localhost:1337/Doctags';
    return this._http.get<Array<Doctags>>(url).toPromise();
  }

  public getTopic(id: number): Observable<Topics> {
    const url = 'http://localhost:1337/Topic/' + id;
    return this._http.get<Topics>(url);
  }

  // tslint:disable-next-line:max-line-length
  public getTopics(id: string | number, topicsFrom: number, topicsTo: number, orderBy: string, direction: string, filterBy: string): Promise<Array<Topics>> {
    if (filterBy !== '') {
      const url = 'http://localhost:1337/Topics?id=' + id + '&skip=' + topicsFrom +
      '&take=' + topicsTo + '&orderBy=' + orderBy + '&direction=' + direction + '&filterBy=' + filterBy;
      return this._http.get<Array<Topics>>(url).toPromise();
    } else {
      const url = 'http://localhost:1337/Topics?id=' + id + '&skip=' + topicsFrom +
      '&take=' + topicsTo + '&orderBy=' + orderBy + '&direction=' + direction;
      return this._http.get<Array<Topics>>(url).toPromise();
    }
  }

  public getExamples(id: number): Promise<Array<Examples>> {
    const url = 'http://localhost:1337/Examples?id=' + id;
    return this._http.get<Array<Examples>>(url).toPromise();
  }

  public getDoctagVersions(id: string): Promise<Array<DocTagVersions>> {
    const url = 'http://localhost:1337/DoctagVersions?id=' + id;
    return this._http.get<Array<DocTagVersions>>(url).toPromise();
  }

  public getTopicHistories(id: number): Promise<Array<TopicHistories>> {
    const url = 'http://localhost:1337/TopicHistories?id=' + id;
    return this._http.get<Array<TopicHistories>>(url).toPromise();
  }

  public getContributors(DocExampleId: number): Promise<Array<Contributors>> {
    const url = 'http://localhost:1337/Contributors?DocExampleId=' + DocExampleId;
    return this._http.get<Array<Contributors>>(url).toPromise();
  }

  public getTopicsCount(id: string | number): Promise<any> {
    const url = 'http://localhost:1337/TopicsCount?id=' + id;
    return this._http.get<any>(url).toPromise();
  }

  public deleteTopic(topicId: number): Promise<Array<Topics>> {
    const url = 'http://localhost:1337/deleteTopic/' + topicId;
    return this._http.delete<Array<Topics>>(url).toPromise();
  }

  public deleteExample(exampleId: number): Promise<Array<Examples>> {
    const url = 'http://localhost:1337/deleteExample/' + exampleId;
    return this._http.delete<Array<Examples>>(url).toPromise();
  }

  public editExample(exampleId: number, data: EditExampleData) {
    const url = 'http://localhost:1337/editExample/' + exampleId;
    return this._http.put<any>(url, data);
  }

}
