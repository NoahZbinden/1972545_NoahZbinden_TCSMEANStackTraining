import { Component, OnInit } from '@angular/core';
import { Info } from '../info.model';
import { InfoService } from '../info.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css'],
})
export class InfoComponent implements OnInit {
  color = 'black';
  submit:boolean = false;
  ans:number[] = [0,0,0,0,0];
  cans:number[] = [];
  results:string= "";
  
  info:Array<Info> = [];
  constructor(public infoSer: InfoService) { } //Di for Info Service

  ngOnInit(): void {
    this.infoSer.loadInfoDetails().subscribe(result =>this.info=result)
  }
  radioChangeHandler(event:any){
    this.ans[event.target.name] = event.target.value;

  }
  checkAns(value:number, ans:number): boolean{
    if(value == ans){
      if(!this.cans.includes(ans)){
        this.cans.push(ans)
      }
    }
    if(value == ans && this.submit == true){
      return true;
    }
    if(this.submit == false){
      return false
    }
    return false; 
  }
  Submit(){
    this.submit = true; 
    console.log(this.cans)
    var total = 0; 
    for(var i = 0; i<4; i++){
      if(this.cans[i]==this.ans[i+1]){
        total++;
      }
    }
    this.results = "You got " + total + " right out of 4!"
  }
}
