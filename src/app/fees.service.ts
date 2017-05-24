import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable'; 

@Injectable()
export class FeesService {

  constructor(private http:Http) { }

  getFeeSchedule() {
    return this.http.request('../assets/fee-schedule.json')
                 .map(resp => resp.json());
  }

}
