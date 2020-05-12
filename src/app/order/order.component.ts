import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms'
import { Router } from "@angular/router"
import { RadioOption } from 'app/shared/radio/radio-option.model';
import { OrderService } from 'app/order/order.service';
import { CarItem } from 'app/restaurant-detail/shopping-cart/cart-item.model';
import { Order, OrderItem } from './order.model';


@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  //as validacoes do form vao ficar aqui
  orderForm: FormGroup

  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

  numberPattern = /^[0-9]*$/



  delivery: number = 8 //normalmente vem de uma api

    //propriedade que representa as opcoes passadas para o componente <mt-radio></mt-radio> dentro order.component.html
    paymentOptions: RadioOption[] = [
      {label: 'Dinheiro', value:'MON'},
      {label: 'Cartão de Débito', value:'DEB'},
      {label: 'Cartão Refeição', value:'REF'}

    ]

  constructor(private orderService: OrderService, private router: Router, private formBuilder: FormBuilder) { }

  //os componentes(propriedades q reprentam inputs do form) do form vao ser passado para k
  //aqui nao usa mais ngModel pois é exclusivo para TemplateForms, aqui está usando a diretiva FormControlName 
  ngOnInit() {
    this.orderForm = this.formBuilder.group({
      name: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      email: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      emailConfirmation: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      address: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      number: this.formBuilder.control('', [Validators.required, Validators.pattern(this.numberPattern)]),
      optionalAddress: this.formBuilder.control(''),
      paymentOption: this.formBuilder.control('', [Validators.required])
     //validador que referencia todos os campos acima  
    }, {validator: OrderComponent.equalsTo})
  }

  //retorna um obj que a chave sera do tipo string e o retorno sera do tipo boolean 
  static equalsTo(group: AbstractControl): {[key:string]:boolean} {
    const email = group.get('email')//pega uma ref do input
    const emailConfirmation = group.get('emailConfirmation')
    if(!email || !emailConfirmation){ //se não existirem no group retorna undefine, pois nao dá para validar
      return undefined
    }

    if(email.value !== emailConfirmation.value){ //se for diferente retorna um obj com a chave string do tipo boolean  
      return {emailsNotMatch:true}//chave=emailsNotMatch valor=true
    }
    return undefined//se os valores forem iguais
  }

  itemsValue(): number {
    return this.orderService.itemsValue()
  }

  carItems(): CarItem[] {
    return this.orderService.cartItems()
  }

  increaseQty(item: CarItem){
    this.orderService.increaseQty(item)
  }

  decreaseQty(item: CarItem){
    this.orderService.decreaseQty(item)
  }

  remove(item: CarItem){
    this.orderService.remove(item)
  }

  checkOrder(order: Order){
    //transf os items que são cartItems(Array) para OrderItem(Array) e joga a compra no order
    order.orderItems = this.carItems()
      .map((item:CarItem)=>new OrderItem(item.quantity, item.menuItem.id))
      this.orderService.checkOrder(order).subscribe((orderId: string)=>{
        this.router.navigate(['/order-summary'])
        //o que vai ser executado quando surgir a resposta
        console.log(`Compra concluída: ${orderId}`)
        this.orderService.clear()//limpa os items apos o post
      })//se increver no metodo subscribe para a requisicao ser feita, neste momento o observable vai
      //fazer a requisicao  
    console.log(order)
  }

  

}
