import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MenuItem } from './menu-item.model';
//animcao
import {trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'mt-menu-item',
  templateUrl: './menu-item.component.html',
  animations: [
    trigger('menuItemAppeared',[
      state('ready', style({opacity: 1})),//vai ficar assim no final
      transition('void => ready', [ //vai de void para ready
        style({opacity: 0, transform: 'translateY(-20px)'}),//esquerda para direita
        animate('500ms 0s ease-in')//velocidade
      ])
    ])
  ]
})
export class MenuItemComponent implements OnInit {

  menuItemState = 'ready'

  @Input() menuItem: MenuItem
  @Output() add = new EventEmitter()

  constructor() { }

  ngOnInit() {
  }

  emitAddEvent(){
    this.add.emit(this.menuItem)//o componente pai associa uma acao
  }

}
