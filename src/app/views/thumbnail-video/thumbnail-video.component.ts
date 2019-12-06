import { Component, OnInit } from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {VideoThumbService} from "../../_service/video-thumb.service";

@Component({
  selector: 'app-thumbnail-video',
  templateUrl: './thumbnail-video.component.html',
  styleUrls: ['./thumbnail-video.component.css']
})
export class ThumbnailVideoComponent implements OnInit {

  constructor(private videoThumbService: VideoThumbService,
              private sanitizer: DomSanitizer
  ) { }

  thumbnailData;
  videoPlay:any;
  videoFile: any;

  /* For Finding a Video Total Time*/
  makeThumb = (event) => {
    this.videoFile = event.target.files[0];
    this.videoPlay = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.videoFile));
  };

  /* For Making a Thumbnails*/
  findPlayTime = (event) => {
    let totalPlayTime = event.target.duration;
    this.videoThumbService.generateThumbnails(this.videoFile, totalPlayTime).then(thumbnailData => {
      console.log(thumbnailData);
      this.thumbnailData = thumbnailData['imagePath'];
    });
  };

  ngOnInit() {
  }

}
