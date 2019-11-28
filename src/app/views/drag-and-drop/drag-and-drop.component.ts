import { Component, OnInit } from '@angular/core';
import {ApiServiceService} from '../../_service/api-service.service';
import {ToastrService} from 'ngx-toastr';
import {CdkDragDrop, moveItemInArray, transferArrayItem, CdkDragEnter, CdkDragExit} from '@angular/cdk/drag-drop';

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
  checkedItems: any = [];

  ngOnInit() {
    this.apiService.getUser().subscribe(result => {
      if (result['meta'].status_code === 200) {
        this.toaster.success(result['meta'].message);
        this.userList = result['data'].userDetails;
        console.log(this.userList);
      }
    }, error => {
      if (error.meta) {
        this.toaster.error(error['meta'].message);
      }
    });
  }

  checkedArray(event){
    // this.movedList.push(event.target.value);
    if(event.target.checked == true){
      this.userList.forEach((result)=> {
        if(result.id == event.target.value){
          /* Duplicate Items Not Pushed In Checked Items Array */
          if(this.checkedItems.findIndex(checkItems => checkItems.id == result.id) === -1){
            this.checkedItems.push(result);
          }
        }
      });
    }
  }

  droppedEvent(event: CdkDragDrop<any>) {

    if (event.previousContainer === event.container) {
      /* For Moving in only it's Array*/
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      /* For Moving a Different Particular Array*/
      transferArrayItem( event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
  }

  entered(event: CdkDragDrop<any>){
    // moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  }

  exits(event: CdkDragDrop<any>){
    console.log("Exits");
    /* For Pushing Items In Display Array*/
    this.checkedItems.forEach(result => {
      /* Duplicate Items Not Pushed In Moved List Array */
      this.movedList;
      if(this.movedList.findIndex(moveList => moveList.id == result.id) === -1){
        this.movedList.push(result);
      }
    });

    /* Remove Items From Original UserListing Array*/
    this.movedList.forEach(result => {
      let index = this.userList.findIndex(user => (user.id == result.id));
      if(index != -1){
        this.userList.splice(index, 1);
      }
    });

    transferArrayItem( this.movedList, this.movedList, event.previousIndex, event.currentIndex);
  }
  
  removeSelected(param){
    this.movedList.forEach(result => {
      let index = this.movedList.findIndex(moveUser => (moveUser.id == param));
      if(index != -1){
        this.movedList.splice(index, 1);
        this.toaster.success("User remove From Selected List");
      }
    });
    console.log(this.movedList);
  }

}
