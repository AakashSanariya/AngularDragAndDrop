import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {first} from "rxjs/internal/operators/first";
import {ToastrService} from "ngx-toastr";
import {ApiServiceService} from "../../_service/api-service.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  spinner: boolean;
  userEmail: string;
  userPassword: string;
  constructor(private router: Router,
              private toaster: ToastrService,
              private apiService: ApiServiceService
  ) { }

  ngOnInit() {
  }

  onSubmit(payLoad){
    this.apiService.login(payLoad).pipe(first()).subscribe(result => {
      if(result){
        if(result['meta'].status_code == 200){
          localStorage.setItem('token', result['data'].data.token);
            this.toaster.success('User Login Successfully');
            this.router.navigate(['/draganddrop']);
        }
      }
    }, error => {
      this.toaster.error(error['meta'].message);
    })
  }

}
