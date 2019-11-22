import { Component, OnInit } from '@angular/core';
import {ApiServiceService} from "../../_service/api-service.service";
import {ToastrService} from "ngx-toastr";
import {CdkDragDrop, moveItemInArray, transferArrayItem, CdkDragEnter, CdkDragExit} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-drag-and-drop',
  templateUrl: './drag-and-drop.component.html',
  styleUrls: ['./drag-and-drop.component.css']
})
export class DragAndDropComponent implements OnInit {

  constructor(private apiService: ApiServiceService,
              private toaster: ToastrService
  ) { }

  userList: any;
  movedList: any = [];

  ngOnInit() {
    this.apiService.getUser().subscribe(result=> {
      if(result['meta'].status_code == 200){
        this.toaster.success(result['meta'].message);
        this.userList = result['data'].userDetails;
        // console.log(this.userList);
      }
    }, error => {
      if(error['meta'].message){
        this.toaster.error(error['meta'].message);
      }
    });
  }

  droppedEvent(event: CdkDragDrop<any>){
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem( event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
  }

}
