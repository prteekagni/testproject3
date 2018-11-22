import { Component, Input } from '@angular/core';

/**
 * Generated class for the CategorycardsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'categorycards',
  templateUrl: 'categorycards.html'
})
export class CategorycardsComponent {

  text: string;
  @Input() items:any = [];

  constructor() {
    console.log('Hello CategorycardsComponent Component');
    this.text = 'Category';
  }

}