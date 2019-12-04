import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {DragAndDropComponent} from './views/drag-and-drop/drag-and-drop.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';
import { ImageCropComponent } from './views/image-crop/image-crop.component';
import {FormsModule} from "@angular/forms";
import {ImageCropperModule} from "ngx-image-cropper";
import { VideoUploadComponent } from './views/video-upload/video-upload.component';
import {ErrorInterceptor} from "./_helpers/error-interceptor";
import {LoginComponent} from "./views/login/login.component";
import {AuthguardGuard} from "./_guard/auth-guard.guard";
import { NavbarComponent } from './container/navbar/navbar.component';
import {FileUploadModule} from "ng2-file-uploading-with-chunk/index";
import {NgxFlowModule, FlowInjectionToken} from "@flowjs/ngx-flow";
import Flow from '@flowjs/flow.js';
import { ListVideoComponent } from './views/list-video/list-video.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DragAndDropComponent,
    ImageCropComponent,
    VideoUploadComponent,
    NavbarComponent,
    ListVideoComponent,
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
    FileUploadModule,
    NgxFlowModule,
  ],
  providers: [
      AuthguardGuard,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: FlowInjectionToken, useValue: Flow }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
