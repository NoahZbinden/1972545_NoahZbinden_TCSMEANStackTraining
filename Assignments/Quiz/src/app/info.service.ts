import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Info } from './info.model';

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  constructor(public http:HttpClient) { }

  loadInfoDetails():Observable<Info[]>{
    return this.http.get<Info[]>("/assets/info.json")
  }
}


