import { Component, OnInit } from '@angular/core';
import { Task } from '../task.model';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  tasks:Array<Task>= [];

  constructor(public taskSer:TaskService) { }

  ngOnInit(): void {
    this.taskSer.retrieveInfo().subscribe(results => this.tasks = results)
  }

  storeTask(taskInfo:any){
    console.log(taskInfo)
    this.taskSer.storeTask(taskInfo);
  }



}
