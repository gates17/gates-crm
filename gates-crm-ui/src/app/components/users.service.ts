import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

const usersURL = 'http://localhost:4000/users';
const baseURL = 'http://localhost:4000/';

@Injectable({
  providedIn: 'root'
})
export class UsersService {


  redirectUrl: string;
  public isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    ) { }

  public login(data): Observable<any> {
    console.log(this.isLoggedIn)
    this.isLoggedIn.next(true);
    const user = this.httpClient.post(baseURL+'auth/login', data);
    return user;
  }

  public logout() {
    /*this.token = null;
    this.token_expires = null;
    this.email = null;
    */
    this.isLoggedIn.next(false);
    this.router.navigate(['/']);
  }

  public resgiter(data): Observable<any> {
    return this.httpClient.post(`${baseURL}/register`, data);
  }

  public getAll() {
    return this.httpClient.get(`${usersURL}`);
  }

  public getUserById(id) {
    return this.httpClient.get(`${usersURL}/${id}`);
  }

  public getUserByUsername(username) {
    return this.httpClient.get(`${usersURL}/user/${username}`);
  }

  public createUser(data){
    return this.httpClient.post(`${usersURL}`, data);
  }

  public updateUser(id, data) {
    return this.httpClient.patch(`${usersURL}/${id}`, data);
  }

  public deleteUser(id) {
    return this.httpClient.delete(`${usersURL}/${id}`);
  }
}
