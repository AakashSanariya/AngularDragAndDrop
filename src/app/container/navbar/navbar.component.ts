import { Component, OnInit } from '@angular/core';
import {ApiServiceService} from "../../_service/api-service.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private apiService: ApiServiceService
  ) { }

  ngOnInit() {
  }

  logOutButtonDisplay(){
    let hastoken = window.localStorage.getItem('token');
    if(hastoken){
      return true;
    }
    else{
      return false;
    }
  }
  
  logOut(){
    this.apiService.signOut();
  }

}
