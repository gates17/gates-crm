import { UsersService } from './../users.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  hide=true

  registerForm = new FormGroup({
    username: new FormControl('', [Validators.required,Validators.maxLength(255)]),
    password: new FormControl('', [ Validators.required, Validators.maxLength(255)]),
    firstname: new FormControl('', [Validators.maxLength(255)]),
    lastname: new FormControl('', [Validators.maxLength(255)]),
    email: new FormControl('', [Validators.required,Validators.maxLength(255)]),
  })

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loginService: UsersService) { }

  ngOnInit(): void {
  }

  gotoList(path) {
    this.router.navigate(['/'+path]);
  }

  register() {
    this.loginService.resgiter(this.registerForm.value).subscribe(result => {
      let jwt = result
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
