import { AuthService } from './../../auth/auth.service';
import { UsersService } from './../users.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide=true;

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required,Validators.maxLength(255)]),
    password: new FormControl('', [ Validators.required, Validators.maxLength(255)]),
  })

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loginService: AuthService) { }

  ngOnInit(): void {
    this.hide

  }

  gotoList(path) {
    this.router.navigate(['/'+path]);
  }

  login() {
    this.loginService.login(this.loginForm.value).subscribe(result => {
      let jwt = result
      console.log(result)
      console.log(jwt)
      /* if("access_token" in jwt){
        localStorage.setItem('user', this.loginForm.value)
        sessionStorage.setItem('access_token', jwt['access_token'])
      }
      else{
        this.router.navigate(['/login'])
        alert('user not found')
      } */
      this.gotoList('users');
    }, error => console.error(error));
  }

}
