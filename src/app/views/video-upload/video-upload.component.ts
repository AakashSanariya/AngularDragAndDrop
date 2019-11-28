import { Component, OnInit } from '@angular/core';
import {Config} from "../../_config/config";
import {FileUploader} from "ng2-file-uploading-with-chunk/index";
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-video-upload',
  templateUrl: './video-upload.component.html',
  styleUrls: ['./video-upload.component.css'],
})
export class VideoUploadComponent implements OnInit {

  uploader = new FileUploader({
    url: Config.chunkVideo,
    authToken: 'Bearer ' + localStorage.getItem('token'),
    disableMultipart: true,
    chunkSize: (1024*1024), // 2Mb chunk in bytes
    chunkMethod: 'POST',
  });
  response: string;

  constructor(private toaster: ToastrService){
  }

  ngOnInit() {
    /* Before Adding File */
    this.uploader.onBeforeUploadItem = (item) => {
      item.withCredentials = false;
    };

    /* After Adding File */
    this.uploader.onAfterAddingFile = (file) => {
      console.log('***** onAfterAddingFile ******')
      console.log('file ', file)
    };

    /* On Chunk Completed
     *  if Url Change required Than Used Only this method
     *  */
    this.uploader.onCompleteChunk = (item:any, response:any, status:any, headers:any) => {
      item.url = Config.chunkVideo;
    };

    /* If Error Occurs While File Upload*/
    this.uploader.onErrorItem = (item, response, status, headers) => {
      console.log(item);
      this.toaster.error("!Opps Some Error Occurs");
    };

    /* File Uploading Completed Than Call*/
    this.uploader.onCompleteItem =  (item:any, response:any, status:any, headers:any) => {
      console.log('ImageUpload:uploaded :', item, status, response, headers);
      this.toaster.success("Video Upload Successfully")
    };

  }

  onSubmit(payLoad){
    console.log(payLoad);
  }
}