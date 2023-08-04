import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { dstyle } from '../model/models';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService
 {

  obj= new BehaviorSubject<dstyle> ({
    offsetLeft: '600',
    offsetWidth: '0'
    });
  

  constructor() { }

  setObj(refData:dstyle){
    this.obj.next(refData)
  }

  getObj() {
    return this.obj.asObservable()
  }

  
 }

