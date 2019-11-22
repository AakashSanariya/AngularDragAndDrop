import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Config} from "../_config/config";
import {map} from "rxjs/internal/operators/map";

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private http: HttpClient) { }
  
  getUser(){
    return this.http.get(Config.allUser).pipe(map(result => {
      return result;
    }));
  }
}
