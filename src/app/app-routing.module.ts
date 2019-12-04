import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DragAndDropComponent} from './views/drag-and-drop/drag-and-drop.component';
import {ImageCropComponent} from "./views/image-crop/image-crop.component";
import {VideoUploadComponent} from "./views/video-upload/video-upload.component";
import {LoginComponent} from "./views/login/login.component";
import {AuthguardGuard} from "./_guard/auth-guard.guard";
import {ListVideoComponent} from "./views/list-video/list-video.component";


const routes: Routes = [
  {
    path: '',
    redirectTo: 'draganddrop',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'draganddrop',
    component: DragAndDropComponent,
    canActivate: [AuthguardGuard]
  },
  {
    path: 'imagecrop',
    component: ImageCropComponent,
    canActivate: [AuthguardGuard]
  },
  {
    path: 'videoupload',
    component: VideoUploadComponent,
    canActivate: [AuthguardGuard]
  },
  {
    path: 'listvideo',
    component: ListVideoComponent,
    canActivate: [AuthguardGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
