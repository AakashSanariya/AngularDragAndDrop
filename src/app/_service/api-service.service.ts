import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Config} from '../_config/config';
import {map} from 'rxjs/internal/operators/map';
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private http: HttpClient,
              private router: Router,
              private toaster: ToastrService
  ) { }

  getUser() {
    return this.http.get(Config.allUser).pipe(map(result => {
      return result;
    }));
  }

  login(payLoad){
    return this.http.post<any>(Config.userLogin, payLoad).pipe(map(user => {
      return user;
    }));
  }

  signOut(){
    localStorage.removeItem('token');
    this.toaster.success("Logout Successfully.");
    this.router.navigate(['/login']);
  }
}
