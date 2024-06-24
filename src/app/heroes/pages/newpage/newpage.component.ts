import { Component } from '@angular/core';

@Component({
  selector: 'app-newpage',
  templateUrl: './newpage.component.html',
  styles: [
  ]
})
export class NewpageComponent {
public publishers=[
  {id:'DC Comics',desc:'DC - Comics'},
  {id:'Marvel Comics',desc:'Marvel - Comics'},
]
}
