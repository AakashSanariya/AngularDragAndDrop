import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DragAndDropComponent} from './views/drag-and-drop/drag-and-drop.component';
import {ImageCropComponent} from "./views/image-crop/image-crop.component";


const routes: Routes = [
  {
    path: '',
    component: DragAndDropComponent
  },
  {
    path: 'imagecrop',
    component: ImageCropComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
