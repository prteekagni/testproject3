import { Component } from '@angular/core';

/**
 * Generated class for the BrandcardsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'brandcards',
  templateUrl: 'brandcards.html'
})
export class BrandcardsComponent {

  text: string;
  public title:string;

  constructor() {
    console.log('Hello BrandcardsComponent Component');
    this.text = 'Hello World';
    this.title='Brands';
  }

}
