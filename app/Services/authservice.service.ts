import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  constructor(private http: HttpClient) { }
  baseurl = "http://localhost:3000"
  register(model: any) {

    return this.http.post(`${this.baseurl}/Users`, model)
  }
  getUsers() {
    return this.http.get(`${this.baseurl}/Users`)
  }
}
