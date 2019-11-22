import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {DragAndDropComponent} from './views/drag-and-drop/drag-and-drop.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {HttpClientModule} from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';
import { ImageCropComponent } from './views/image-crop/image-crop.component';
import {FormsModule} from "@angular/forms";
import {ImageCropperModule} from "ngx-image-cropper";

@NgModule({
  declarations: [
    AppComponent,
    DragAndDropComponent,
    ImageCropComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    DragDropModule,
    ImageCropperModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
