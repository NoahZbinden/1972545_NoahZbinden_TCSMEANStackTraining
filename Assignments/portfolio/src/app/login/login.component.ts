import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  msg:string = "";
  constructor(public router:Router) { }

  ngOnInit(): void {
  }
  Page(){
    this.router.navigate(["page"]);
  }
  checkUser(loginRef:any) {
    let user1 = loginRef.user;
    let pass1 = loginRef.pass;
    let storedLogin = localStorage.getItem("Login");
    console.log(storedLogin)
    if (storedLogin != null){
      let x = JSON.parse(storedLogin)
    if(x[0] == user1 && x[1] ==pass1){
      this.router.navigate(["display"]);
    } else {
      this.msg = "Error Logging In. Please Register if you haven't already"
    }
  }
  }
}
