import { Component, OnInit } from '@angular/core';

import { Restaurant } from './restaurant/restaurant.model'
import { RestaurantsService } from 'app/restaurants/restaurants.service';
//animcao
import {trigger, state, style, transition, animate } from '@angular/animations';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/debounceTime'
import 'rxjs/add/operator/distinctUntilChanged'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/from'
import { Observable } from 'rxjs/Observable'

@Component({
  selector: 'mt-restaurants',
  templateUrl: './restaurants.component.html',
  animations: [
    trigger('toggSearch',[
      state('hidden', style({
        opacity: 0,
        "max-height": "0px"
      })),//vai ficar assim no final
      state('visible', style({
        opacity: 1,
        "max-height": "70px",
        "margin-top": "20px"
      })),
      transition('* => *', animate('250ms 0s ease-in-out'))
    ])
  ]
})
export class RestaurantsComponent implements OnInit {

  searchBarState = 'hidden'
  restaurants: Restaurant[]

  searchForm: FormGroup
  searchControl: FormControl//ouve os valores que vão ser digitados na barra de busca

 constructor(private restaurantService: RestaurantsService,
             private fb: FormBuilder) { }

  ngOnInit() {

    this.searchControl = this.fb.control('')
    this.searchForm = this.fb.group({
      searchControl: this.searchControl
    })
    //ouve o que o usuario esta digitando na barra de busca
    //debounceTime(500) só vai fazer a query se a dif entre 2 eventos for maior que o tempo que eu informar
    //vai fazer a query novamente se a dif entre uma tecla e outra for maior que 500milsegundos
    this.searchControl.valueChanges
      .debounceTime(500)
      .distinctUntilChanged()//vai fazer a query somente se a ultima palavra for diferente da antepenutima
     // .do(searchTerm => console.log(`q=${searchTerm}`)) mostra o que foi digitado
      .switchMap(searchTerm => 
      this.restaurantService
        .restaurants(searchTerm)
        .catch(error=>Observable.from([])))//caso de erro vai retornar um array vazio para não quebbrar o valueChanges
      .subscribe(restaurants => this.restaurants = restaurants)

    this.restaurantService.restaurants()
    .subscribe(restaurants => this.restaurants = restaurants)
  }

  toggleSearch() {
    this.searchBarState = this.searchBarState === 'hidden' ? 'visible' : 'hidden';
  }

}
