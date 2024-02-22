import { Injectable, SkipSelf } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl + '/file';

  constructor(private http: HttpClient) { }

  upload(body: any): Observable<any> {
    return this.http.post(this.apiUrl, body);
  }

}
