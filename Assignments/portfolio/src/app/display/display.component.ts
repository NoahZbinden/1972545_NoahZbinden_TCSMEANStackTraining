import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
 UserName:String = "";
 ArrayNum:String[] = [];
 ArrayName:String[] = [];
 hide:String = "hidden";
 
  constructor() { 
  }
  ngOnInit(): void {
  }
  addInfo(value:any){
    this.hide = "";
    let cName = value.cName; 
    let cNumber = value.cNumber;
    this.ArrayName.push(cName);
    this.ArrayNum.push(cNumber); 
  }
  userName(){
    let storedLogin = localStorage.getItem("Login");
    if (storedLogin != null){
      let x = JSON.parse(storedLogin)
      this.UserName = x[0]
    }
  }
}
