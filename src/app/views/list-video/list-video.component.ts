import { Component, OnInit } from '@angular/core';
import {ApiServiceService} from "../../_service/api-service.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-list-video',
  templateUrl: './list-video.component.html',
  styleUrls: ['./list-video.component.css']
})
export class ListVideoComponent implements OnInit {

  videoList: any;

  constructor(private apiService: ApiServiceService,
              private toaster: ToastrService
  ) { }

  ngOnInit() {
    let videoDraw: any = null;
    this.apiService.getVideoList(videoDraw).subscribe(result => {
      if(result['meta'].status_code == 200){
        this.toaster.success("Video Listing Successfully");
        this.videoList = result['data'].videoList.original.data
      }
    }, error => {
      this.toaster.error("!Oops Some Error Occurs.");
    })
  }

}
