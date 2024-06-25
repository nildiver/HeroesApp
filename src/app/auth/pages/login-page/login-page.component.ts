import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: [
  ]
})
export class LoginPageComponent {
  constructor(private authService:AuthService){}

  onLongin():void{
    this.authService.login('nilton@gmail.com',  '123456')
    .subscribe(user =>{

    })
  }
}
