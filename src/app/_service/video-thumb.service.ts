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

      /* video Play and Make a Image Thumbnails in canvas
      * Duration Change Event
      * */

      video.addEventListener('loadedmetadata', () => {
        if(totalTime <= 120){
          this.snapShot = 3;
        }
        // video.currentTime = (totalTime/this.snapShot);
        // video.play();
        this.drawImage = setInterval(makeThumbnail, 2000);
      });

      const makeThumbnail = () => {
        // video.play();
        this.snapShot--;
        if(this.snapShot == 0){
          clearInterval(this.drawImage);
          console.log(this.snapShot, "Interval Clear");
        }
        canvas.width = 150;
        canvas.height = 150;
        context.drawImage(video, 0, 0, 150, 150);
        resolve(canvas.toDataURL());
        var img = new Image();
        img.src = canvas.toDataURL("image/png");
        this.thumbnail.push(img.src);
        if(this.snapShot >0){
          video.currentTime = (totalTime/this.snapShot);
        }
        console.log("thumbnails", this.snapShot)
      };

      video.addEventListener('pause', () => {
      });


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
    console.log(this.thumbnail);
    return akash;
  }
  
}
