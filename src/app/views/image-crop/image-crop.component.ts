import { Component, OnInit } from '@angular/core';
import {ImageCroppedEvent} from "ngx-image-cropper/ngx-image-cropper";

@Component({
  selector: 'app-image-crop',
  templateUrl: './image-crop.component.html',
  styleUrls: ['./image-crop.component.css']
})
export class ImageCropComponent implements OnInit {

  imageUploaded: any;
  imageChangedEvent: any = '';
  croppedImage: any = '';

  constructor() { }

  ngOnInit() {
  }

  imageUpload(event){
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent){
    this.croppedImage = event.base64;
  }

  /*
  * This three function gives always a defination
  * because other wise it gives error
  * by default function defination get
  * */
  imageLoaded(){

  }
  cropperReady(){
    
  }
  loadImageFailed(){

  }


}
