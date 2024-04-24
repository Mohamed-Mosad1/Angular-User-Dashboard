import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private _HttpClient: HttpClient) {  }

baseUrl: string = 'https://reqres.in';

  getUsers(pageNumber:number = 1) : Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/api/users?page=${pageNumber}`);
  }

  getUserById(id:number) : Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/api/users/${id}`);
  }


}
