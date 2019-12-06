import {Injectable, Inject} from '@angular/core';
import {DOCUMENT} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class VideoThumbService {

  constructor(@Inject(DOCUMENT) private document: Document) { }
  snapShot: number = 6; // Total number Of Thumbnails
  thumbnail = [];
  count = 0;
  drawImage = null;
  generateThumbnails = (videoFile, totalPlayTime) => {
     const totalTime = totalPlayTime;
     const video: HTMLVideoElement = this.document.createElement('video');
     const canvas: HTMLCanvasElement = this.document.createElement('canvas');
     const context: CanvasRenderingContext2D = canvas.getContext("2d");

    let akash =  new Promise((resolve, reject) => {

      /*For Video & Canvas Error Display*/
      canvas.addEventListener('error', reject);
      video.addEventListener('error', reject);

      /* when video loaded meta data
      * than start making thumbnails
      * */

      video.addEventListener('loadedmetadata', () => {
        if(totalTime <= 120){
          this.snapShot = 3;
        }
        video.currentTime = (totalTime/this.snapShot);
        this.drawImage = setInterval(makeThumbnail, 1000); // 2 sec Time Interval
      });

      const makeThumbnail = () => {
        this.snapShot--;
        if(this.snapShot == 0){
          clearInterval(this.drawImage); // if Total snapshot (thumbnail) complete than remove
        }

        /* Thumbnails Make */
        canvas.width = 150;
        canvas.height = 150;
        context.drawImage(video, 0, 0, 150, 150);
        resolve(canvas.toDataURL());
        var img = new Image();
        img.src = canvas.toDataURL("image/png");
        this.thumbnail.push(img.src);

        /* Current Time Change For New Image*/
        if(this.snapShot >0){
          video.currentTime = (totalTime/this.snapShot);
        }
      };

      /* Set Video type Attributes */
      if(videoFile.type){
        video.setAttribute('type', videoFile.type);
      }
      video.preload = 'auto';
      video.src = window.URL.createObjectURL(videoFile);
      video.load();
      resolve({
        'imagePath': this.thumbnail
      })
    });
    return akash;
  };
}
