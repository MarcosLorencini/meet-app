import { Component, OnInit, Input, ContentChild, AfterContentInit } from '@angular/core';
import { NgModel, FormControlName } from '@angular/forms'


@Component({
  selector: 'mt-input-container',
  templateUrl: './input.component.html'
})
export class InputComponent implements OnInit, AfterContentInit {

  @Input() label: string //@Input() passa um valor para esta  propriedade  
  @Input() errorMessage: string
  input: any

  @ContentChild(NgModel) model: NgModel //refer para NgModel quando alguem usar as propriedades(error, errorMessage, input ) no order.component.html
  
  //usando a diretiva FormControlName para validar o form
  @ContentChild(FormControlName) control: FormControlName


  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit(){ //vai ser chamado quando o conteudo(que ficara dentro do <ng-content></ng-content>) for definido
    //pega uma diretiva ou a outra
    this.input = this.model || this.control//ngModel é referenciada pelo atributo input que esta em input.compoment.html
    if(this.input === undefined){
      throw new Error('Esse componente precisa ser usado com uma diretiva ngModel ou FormControlName ')
    }
  }

  hasSuccess(): boolean{
    return this.input.valid && (this.input.dirty || this.input.touched)
  }

  hasError(): boolean {
    return this.input.invalid && (this.input.dirty || this.input.touched)
  }

}
