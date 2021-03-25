import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {
 user:string = "";
 pass:string = "5555";
 msg:string = "";
  constructor(public router:Router) { }

  ngOnInit(): void {
  }

  loginPage(){
      this.router.navigate(["login"]);
  }

  registerUser(registerInfo:any){
     this.user = registerInfo.user;
     this.pass = registerInfo.pass;
     let array: string[] = [this.user, this.pass];
     localStorage.setItem("Login", JSON.stringify(array));
     this.msg="You have been registered succesfuly! Return to login page."
  }
}
