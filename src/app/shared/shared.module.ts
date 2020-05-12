//RIANDO UM MODULO COMPARTILHADO
//ReaciveFormsModule: no nosso compon input usa tanto NgModule e FormControlName
//module que vai ser importado por outros modules: compras 
//ModuleWithProviders importa os modulos com providers ou outra hora sem os providers 
import { NgModule, ModuleWithProviders } from '@angular/core'

//tem a diretivas basicas
import { CommonModule } from'@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms' 


import { InputComponent } from 'app/shared/input/input.component';
import { RadioComponent } from 'app/shared/radio/radio.component';
import { RatingComponent } from 'app/shared/rating/rating.component';
import { ShoppingCartService } from 'app/restaurant-detail/shopping-cart/shopping-cart.service';
import { RestaurantsService } from 'app/restaurants/restaurants.service';
import { OrderService } from 'app/order/order.service';
import { SnackbarComponent } from 'app/shared/messages/snackbar/snackbar.component';
import { NotificationService } from 'app/shared/messages/notification.service';


@NgModule({
    declarations: [InputComponent, RadioComponent, RatingComponent, SnackbarComponent],
    imports: [CommonModule, FormsModule, ReactiveFormsModule],//depedencias do nosso modulo, 
    exports: [InputComponent, RadioComponent,SnackbarComponent, 
                RatingComponent, CommonModule, 
                FormsModule, ReactiveFormsModule]//vão ser utilizados por outros modulos
})
export class SharedModule {
    //funcao que retorne um modulo com providers que é a config do nosso modulo mais os providers
    //que vamos importar somente em um lugar
    static forRoot(): ModuleWithProviders {
        return {
          //retorna um objeto com duas propriedades
          //SharedModel que vai ter todas as config necessarias para importar de outros lugares
          ngModule: SharedModule,
          //e um lista de providers
          providers: [ShoppingCartService, RestaurantsService, OrderService,NotificationService]  
        }
    }

}