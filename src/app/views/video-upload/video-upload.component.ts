import {Component, OnInit, ViewChild} from '@angular/core';
import {Config} from "../../_config/config";
import {FileUploader} from "ng2-file-uploading-with-chunk/index";
import {ToastrService} from "ngx-toastr";
import {Subscription} from "rxjs/index";
import {FlowDirective, Transfer} from "@flowjs/ngx-flow/public_api";
import {ApiServiceService} from "../../_service/api-service.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-video-upload',
  templateUrl: './video-upload.component.html',
  styleUrls: ['./video-upload.component.css'],
})
export class VideoUploadComponent implements OnInit {

  /* NG 2 File Upload With Chunk*/
  uploader = new FileUploader({
    url: Config.chunkVideo,
    authToken: 'Bearer ' + localStorage.getItem('token'),
    // disableMultipart : false,
    autoUpload: true,
    maxFileSize: (1024 * 1024 * 1024), // 1 Gb Max File Size
    chunkSize: (1024 * 1024), // 2Mb chunk in bytes
    chunkMethod: 'POST',
    allowedFileType: ['video']
  });
  response: string;

  /*NGX Flow Js Video Upload Configuration*/
  chunkUrl: string = Config.chunkVideoLive;
  autoUploadSubscription: Subscription;
  @ViewChild('flowAdvanced', {static: true})
  flow: FlowDirective;
  fileUploadSuccess: boolean = false;
  videoUrlData: string;
  videoAccessType: any = ['video/mp4', 'video/mpeg4', 'video/3gpp'];
  flowConfig = {
    target: this.chunkUrl,
    // testChunks: false,
    chunkSize: 10000000, // 10Mb Chunk Size
    // maxChunkRetries: 1,
    singleFile: true,
    /*headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }*/
  };

  constructor(private toaster: ToastrService,
              private apiService: ApiServiceService,
              private router: Router
  ){
  }

  ngAfterViewInit(){
    this.autoUploadSubscription = this.flow.events$.subscribe(result => {

      /* If File Selected */
      if(result.type === 'filesSubmitted'){
        this.flow.upload();
      }

      /* If File Upload Success */
      if(result.type === 'fileSuccess'){
        let videoNameChange: any = result.event['1'];
        this.videoUrlData = videoNameChange.replace('./', '/');  //Video Name Replace
        /*console.log(this.videoUrlData);*/
        this.toaster.success("Video Upload Successfully");
        this.fileUploadSuccess = true;
      }

      /* For File Uploading Paused Or Resume*/
      if(result.type === 'pauseOrResume'){
        this.fileUploadSuccess = false;
        this.toaster.warning("Video Uploading Pause Or Resume");
      }

      /*For File Uploading cancel*/
      if(result.type === 'fileRemoved'){
        this.toaster.warning("video Uploading Cancel");
        this.fileUploadSuccess = false;
      }

      if(result.type === 'fileError'){
        this.toaster.error("!Oops Some Error Occurs Video Not Uploading");
      }

      // console.log(result);
    });
  }

  ngOnDestroy(){
    this.autoUploadSubscription.unsubscribe();
  }

  onSubmit(payLoad){
    this.apiService.videoUpload(payLoad).subscribe(result => {
      if(result['meta'].status_code == 200){
        this.toaster.success(result['meta'].message);
        this.router.navigate(['/listvideo']);
      }
    }, error => {
      this.toaster.error("!Oops Some Error Occurs Video Not Upload");
    });
  }
  

  ngOnInit() {
    /* Before Adding File */
    this.uploader.onBeforeUploadItem = (item) => {
      item.withCredentials = false;
    };

    /* After Adding File */
    this.uploader.onAfterAddingFile = (file) => {
      console.log('***** onAfterAddingFile ******');
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
      console.log(item, response, status, headers);
      this.toaster.error("!Opps Some Error Occurs");
    };

    /* File Uploading Completed Than Call*/
    this.uploader.onCompleteItem =  (item:any, response:any, status:any, headers:any) => {
      console.log('ImageUpload:uploaded :', item, status, response, headers);
      this.toaster.success("Video Upload Successfully")
    };

    /* Video Uploading Failed */
    this.uploader.onWhenAddingFileFailed = (item: any, filter: any, options: any) => {
      console.log('***** onWhenAddingFileFailed ********');
      console.log(filter);
      this.toaster.error("!Opps Error Occurs in " + filter.name);
    };

  }
}
