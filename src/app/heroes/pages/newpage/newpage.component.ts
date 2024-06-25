import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';

import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap } from 'rxjs';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ComfirDialogComponent } from '../../components/comfir-dialog/comfir-dialog.component';

@Component({
  selector: 'app-newpage',
  templateUrl: './newpage.component.html',
  styles: [
  ]
})
export class NewpageComponent  implements OnInit{


public heroForm = new FormGroup({
  id: new FormControl<string>(''),
  superhero:new FormControl<string>('',{nonNullable:true}),
  publisher:new FormControl<Publisher>(Publisher.DCComics),
  alter_ego:new FormControl(''),
  first_appearance:new FormControl(''),
  characters:new FormControl(''),
  alt_img:new FormControl(''),
});

public publishers=[
  {id:'DC Comics',desc:'DC - Comics'},
  {id:'Marvel Comics',desc:'Marvel - Comics'},
];

constructor(
  private heroservices:HeroesService,
  private activatedRoute:ActivatedRoute,
  private router:Router,
  private snackbar:MatSnackBar,
  private dialog:MatDialog
){}

get currentHero():Hero{
  const hero=this.heroForm.value as Hero;
  return  hero;
}

ngOnInit(): void {
    if (!this.router.url.includes('edit'))return;

    this.activatedRoute.params
    .pipe(
      switchMap(({id})=> this.heroservices.getHeroBy(id)),
    ).subscribe(hero => {
      if (!hero){
        return this.router.navigateByUrl('/');

      }

      this.heroForm.reset(hero)
      return;
    });
}

onSubmit():void{

  if (this.heroForm.invalid)return;

  if (this.currentHero.id){
    this.heroservices.updateHero(this.currentHero)
    .subscribe((hero:Hero) =>{
      //mostrar snackbar
      this.showSnackbar(`${hero.superhero} updated!`);

    });
    return;
  }
  this.heroservices.addHero(this.currentHero)
  .subscribe((hero:Hero) =>{
    //mostrar snackbar , y navegar a /heroes/edit/hero.id
    this.router.navigate(['/heroes/dit',hero.id]);
    this.showSnackbar(`${hero.superhero} created!`);
  });
  // console.log({
  //   formIsvalid:this.heroForm.valid,
  //   value: this.heroForm.value,
  // })
}

onDeletedHero(){
  if(!this.currentHero.id) throw Error('Hero id is required');

  const dialogRef = this.dialog.open(ComfirDialogComponent, {
    data: this.heroForm.value
  });

  dialogRef.afterClosed()
  .pipe(
    filter( (result: boolean) => result ),
    switchMap( () => this.heroservices.deleteHeroById( this.currentHero.id )),
    filter( (wasDeleted: boolean) => wasDeleted ),
  )
  .subscribe(() => {
    this.router.navigate(['/heroes']);
  });

  //   dialogRef.afterClosed().subscribe(result => {

  //     if (!result )return;
  //     this.heroservices.deleteHeroById(this.currentHero.id)
  //     .subscribe(wasDeleted => {
    //       if(wasDeleted)
    //         this.router.navigate(['/heroes']);
    //     })
    //   });
    // }

  }


  showSnackbar( message: string ):void {
    this.snackbar.open( message, 'done', {
      duration: 2500,
    })
  }

}




