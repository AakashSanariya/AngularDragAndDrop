import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {DragAndDropComponent} from "./views/drag-and-drop/drag-and-drop.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {HttpClientModule} from "@angular/common/http";
import {ToastrModule} from "ngx-toastr";

@NgModule({
  declarations: [
    AppComponent,
    DragAndDropComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    DragDropModule,
    HttpClientModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
