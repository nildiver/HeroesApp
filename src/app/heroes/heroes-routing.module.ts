import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent }from './pages/layout-page/layout-page.component'
import { NewpageComponent } from './pages/newpage/newpage.component';
import { SearchpageComponent } from './pages/searchpage/searchpage.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { HeroPageComponent } from './pages/hero-page/hero-page.component';
const routes: Routes = [
  {
    path:'',
    component:LayoutPageComponent,
    children:[
      { path:'new-hero',component:NewpageComponent},
      { path:'search',component:SearchpageComponent},
      {path:'edit/:id',component:NewpageComponent },
      {path:'list',component:ListPageComponent},
      {path:':id',component:HeroPageComponent},
      {path:'**',redirectTo:'list'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeroesRoutingModule { }
