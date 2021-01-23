import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap,shareReplay } from 'rxjs/operators';

const baseURL = 'http://localhost:4000/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {

  }


  public login(data): Observable<any>{
    console.log('REQUEST')
    return this.http.post(baseURL+'auth/login', data).pipe( tap(res => this.setSession(res)),shareReplay());
          //.do(res => this.setSession).shareReplay();
  }

  private setSession(authResult) {
/*       const d = new Date(0);
      d.setUTCSeconds(authResult.expiresIn['exp']);
      console.log(d);
 */
      // const expiresAt = moment().add(authResult.expiresIn,'second');
      console.log('SESSION')
      console.log(authResult.expiresIn)
      const expiresAt = authResult.expiresIn['exp'];

      localStorage.setItem('id_token', authResult['access_token']);
      localStorage.setItem("expires_at", JSON.stringify(expiresAt) );
      // localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
  }

  logout() {
      localStorage.removeItem("id_token");
      localStorage.removeItem("expires_at");
  }

/*   public isLoggedIn() {
      return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
      return !this.isLoggedIn();
  }
 */
  getExpiration() {
      const expiration = localStorage.getItem("expires_at");
      const expiresAt = JSON.parse(expiration);
      // return moment(expiresAt);
      return expiresAt;
  }

}
