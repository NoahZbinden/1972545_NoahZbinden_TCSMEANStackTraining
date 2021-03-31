import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Task} from './task.model';


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(public http:HttpClient) { }

  //Post for Input
  storeTask(info:any){
    this.http.post("http://localhost:3000/taskList", info)
    .subscribe(results=>console.log(results),error => console.log(error));
  }

  retrieveInfo():Observable<Task[]>{
    return this.http.get<Task[]>("http://localhost:3000/taskList");
  }

}
