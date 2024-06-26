import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { MaterialModule } from '../material/material.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { HeroImagePipe } from './heroes/pipes/hero-image.pipe';


@NgModule({
  declarations: [
    LoginPageComponent,
    RegisterPageComponent,
    LayoutPageComponent,
    HeroImagePipe
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule,

  ],
  exports:[

  ]
})
export class AuthModule { }
