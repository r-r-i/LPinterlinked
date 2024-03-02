import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPredatorCaps } from '../types/predator-cap.model';

@Injectable({
  providedIn: 'root'
})
export class ApexDataService {
  apiKey = '7245a6cdada7f26ec0e9e4799eb489aa';

  constructor(private http: HttpClient) {}

  public getPredatorCap(): Observable<IPredatorCaps> {
    return this.http.get<IPredatorCaps>(
      `https://api.mozambiquehe.re/predator?auth=${this.apiKey}`
    );
  }
}
