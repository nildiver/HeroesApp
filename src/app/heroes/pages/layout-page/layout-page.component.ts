import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/auth/interfaces/users.interface';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styles: [
  ]
})
export class LayoutPageComponent {

  public siderbarItem=[
    {label:'Listado', icon:'label',url:'./list' },
    {label:'Añadir', icon:'add',url:'./new-hero' },
    {label:'Buscar', icon:'search',url:'./search' },

  ]

  constructor(
    private authservive:AuthService,
    private router:Router
  ){}

get user():User | undefined {
  return this.authservive.currentUser;
}



  onLogout():void{
   this.authservive.logout();
   this.router.navigate(['/auth/login'])
  }

}
