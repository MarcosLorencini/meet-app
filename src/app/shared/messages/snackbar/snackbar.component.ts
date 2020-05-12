import { Component, OnInit } from '@angular/core';
//animacoes
import { trigger, state, style, transition, animate } from "@angular/animations"

//quem vai consumir as msg de add e remover do ShoppingCartService e o componete SnackbarComponent
import { NotificationService } from 'app/shared/messages/notification.service';

//timer para sumir a msg de add e remover os itens no carrinho
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/timer'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/switchMap'




@Component({
  selector: 'mt-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css'],
  animations: [
    //animcoes definidas atraves da funcao trigger
    trigger('snack-visibility', [
      state('hidden', style({
        opacity: 0,
        bottom: '0px'
      })),
      state('visible', style({
        opacity: 1,
        bottom: '30px'
      })),
      transition('hidden => visible', animate('500ms 0s ease-in')),
      transition('visible => hidden', animate('500ms 0s ease-out'))

    ])
  ]
})
export class SnackbarComponent implements OnInit {

  message: string = 'Hello there!'

  snackVisibility: string = 'hidden'

  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
    //se inscrever no notification service, pois ele é um EventEmitter
    //ele vai ficar escutando a msg gerara pelo service notificationService em qualquer componente ex:
    //ShoppingCartService

    //excuta uma acao quando chega a msg
    this.notificationService.notifier  
    .do(message =>{
      //escutou a msg recebe a msg
      this.message = message
      // e mostra a msg
      this.snackVisibility = 'visible'
      //faz um subscribe para o timer que em seguida(quando o tempo acabar) esconde a msg
      //timer nao concorre com outros timers
    }).switchMap(message => Observable.timer(3000))
      .subscribe(timer => this.snackVisibility = 'hidden') 
   
  }

}
