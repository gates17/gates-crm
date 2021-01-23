import { UsersService } from './../users.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  results: any[];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loginService: UsersService) { }

  ngOnInit() {
    this.getUsersAll()

  }

  gotoList() {
    this.router.navigate(['/']);
  }

  getUsersAll() {
    this.loginService.getAll().subscribe(result => {
      this.results= result['data']
      console.log(this.results)
      /* if("access_token" in jwt){
        localStorage.setItem('user', this.loginForm.value)
        sessionStorage.setItem('access_token', jwt['access_token'])
      }
      else{
        this.router.navigate(['/login'])
        alert('user not found')
      } */
    }, error => console.error(error));
  }
}
