// CRIANDO UM MODULO PARA COMPRAS, POIS PODE ACONTECER DO CLIENTE NÃO SUBMETER A COMPRA

import { NgModule } from '@angular/core'
//para carregar o modulo inteiro
import { RouterModule, Routes } from '@angular/router'
import { OrderComponent } from 'app/order/order.component';
import { OrderItemsComponent } from 'app/order/order-items/order-items.component';
import { DeliveryCostsComponent } from 'app/order/delivery-costs/delivery-costs.component';
import { SharedModule } from 'app/shared/shared.module';

const ROUTES: Routes = [
    {path:'', component: OrderComponent}//componente principal
]

@NgModule({
    declarations:[OrderComponent, OrderItemsComponent, DeliveryCostsComponent],//componentes que fazem parte do nosso modulo
    //devido o ModuleWithProviders aqui o SharedModule importa somente os componentes
    imports: [SharedModule, RouterModule.forChild(ROUTES)]//tem alguns componentes que vamos usar e estão no SharedModule
})

export class OrderModule{}
