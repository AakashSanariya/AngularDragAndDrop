import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DragAndDropComponent} from "./views/drag-and-drop/drag-and-drop.component";


const routes: Routes = [
  {
    path: '',
    component: DragAndDropComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
