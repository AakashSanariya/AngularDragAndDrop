import { Component, OnInit } from '@angular/core';
import {ApiServiceService} from "../../_service/api-service.service";
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-scrolling',
  templateUrl: './scrolling.component.html',
  styleUrls: ['./scrolling.component.css']
})
export class ScrollingComponent implements OnInit {

  dataSource: DataSourceOfUser;

  constructor(private apiService: ApiServiceService) {
    this.dataSource = new DataSourceOfUser(apiService) //For call a service method that's way apiservice passed
  }

  ngOnInit() {
  }
}


export class DataSourceOfUser extends DataSource<any> {
  cachedFacts = Array.from({ length: 0 });
  dataStream = new BehaviorSubject(this.cachedFacts);
  subscription = new Subscription();
  startDataNo: number;
  endDataNo: number;

  constructor(private apiService: ApiServiceService) {
    super();
    // Start with some data.
    this.fetchDataPage();
  }

  /* Adding new Data in Subscription to end page*/
  connect(collectionViewer: CollectionViewer): Observable<any> {
    this.subscription.add(collectionViewer.viewChange.subscribe(result => {
      this.startDataNo = result.start;
      this.endDataNo = result.end;
      this.fetchDataPage();
    }));
    return this.dataStream;
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.subscription.unsubscribe();
  }

  /*For Fetchin a data From Api and Append it*/
  private fetchDataPage(): void {
      this.apiService.getUser().subscribe(res => {
        this.cachedFacts = this.cachedFacts.concat(res['data'].userDetails);
        this.dataStream.next(this.cachedFacts);
      });
  }
}