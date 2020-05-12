import { Component, OnInit, Input } from '@angular/core';
import { Restaurant } from './restaurant.model';
//animcao
import {trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'mt-restaurant',
  templateUrl: './restaurant.component.html',
  animations: [
    trigger('restaurantAppeared',[
      state('ready', style({opacity: 1})),//vai ficar assim no final
      transition('void => ready', [ //vai de void para ready
        style({opacity: 0, transform: 'translate(-30px, -10px)'}),//esquerda para direita
        animate('500ms 0s ease-in-out')
      ])
    ])
  ]
})
export class RestaurantComponent implements OnInit {

  restaurantState = 'ready'//comeca com ready

  @Input() restaurant: Restaurant

  constructor() { }

  ngOnInit() {
  }

}
