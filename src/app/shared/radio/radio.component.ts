import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { RadioOption } from 'app/shared/radio/radio-option.model';

//vai dar poderes ao nosso componente no sentido de ter uma ponte para 
// conversar com as diretivas especiais de formulario como ngModel ou ReactForms
import {  NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms'


@Component({
  selector: 'mt-radio',
  templateUrl: './radio.component.html',
  providers: [//registra o NG_VALUE_ACCESSOR no providers do componente RadioComponent
    {//
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioComponent),//para para a funcao forwardRef a referencia do componente RadioComponent, 
      multi: true // registra o componente RadioComponent como NG_VALUE_ACCESSOR, que fica disponível para ser usado com as diretiva ngModel e ReactForms
    }
  ]
})
export class RadioComponent implements OnInit, ControlValueAccessor {

  @Input() options: RadioOption[] //vem de fora

  value: any

  onChange: any

  constructor() { }

  ngOnInit() {
  }

  setValue(value: any) {
    this.value = value
    this.onChange(this.value)// avisa as diretivas que estiverem usando o componente que o valor mudou
  }



   /**
     * Write a new value to the element.
     * Chamado pelas diretivas quando elas querem passar um valor para o seu componente
     * 
     */
    writeValue(obj: any): void {
      this.value = obj

    }
    /**
     * Set the function to be called when the control receives a change event.
     * passa uma funcao e tem que chamar a funcao quando o valor do componente mudar passando um novo valor
     */
    registerOnChange(fn: any): void{
      this.onChange = fn
    }
    /**
     * Set the function to be called when the control receives a touch event.
     * registra que o usuario entrou no componente
     */
    registerOnTouched(fn: any): void{

    }
    /**
     * This function is called when the control status changes to or from "DISABLED".
     * Depending on the value, it will enable or disable the appropriate DOM element.
     *
     * @param isDisabled
     */
    setDisabledState?(isDisabled: boolean): void;

}
