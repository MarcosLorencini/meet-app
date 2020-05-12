import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
//PreloadAllModules carrega os modulos tardiamente, mas em background 
import { RouterModule, PreloadAllModules } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { ROUTES } from './app.routes'

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { RestaurantComponent } from './restaurants/restaurant/restaurant.component';
import { RestaurantDetailComponent } from './restaurant-detail/restaurant-detail.component';
import { MenuComponent } from './restaurant-detail/menu/menu.component';
import { ShoppingCartComponent } from './restaurant-detail/shopping-cart/shopping-cart.component';
import { MenuItemComponent } from './restaurant-detail/menu-item/menu-item.component';
import { ReviewsComponent } from './restaurant-detail/reviews/reviews.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
//usando a estratégia de Hash
//
import { LocationStrategy, HashLocationStrategy } from '@angular/common'


//NAO PRECISA MAIS IMPORTAR ESTES COMPONENTES e SERVICES COMENTADOS, 
//POIS JA FORAM IMPORTADOS PELO SharedModule
import { SharedModule } from './shared/shared.module';
import { NotFoundComponent } from './not-found/not-found.component'
//import { RatingComponent } from './shared/rating/rating.component';
//import { InputComponent } from './shared/input/input.component';
//import { RadioComponent } from './shared/radio/radio.component';

//import { RestaurantsService } from './restaurants/restaurants.service';
//import { ShoppingCartService } from './restaurant-detail/shopping-cart/shopping-cart.service';
//import { OrderService } from 'app/order/order.service';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    RestaurantsComponent,
    RestaurantComponent,
    RestaurantDetailComponent,
    MenuComponent,
    ShoppingCartComponent,
    MenuItemComponent,
    ReviewsComponent,
    OrderSummaryComponent,
    NotFoundComponent,
    // InputComponent,
    // RadioComponent,
   // RatingComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
   // FormsModule,
    //ReactiveFormsModule,
    //import todos os componentes compartilhados no SharedModule mais o providers que estão dentro do mesmo
    SharedModule.forRoot(),
    //PreloadAllModules os modulos(forma tardia) serão carregados logo depois que os modulos principais 
    //serve para não ter paradas para carregar os compontentes lazy muito grande
    // os loadChildren do app.routes.ts
    RouterModule.forRoot(ROUTES, {preloadingStrategy: PreloadAllModules})
  ],//sempre que alguem pedir LOCALE_ID use pt-BR
    //implentatacao com hash para localizar a aplicacao na url. # na frente da url ex: localhost:4200/#/
    //tudo que vem apos o # é processado no client, o server ignora do # em diante
  providers: [{provide:LocationStrategy, useClass: HashLocationStrategy},{provide: LOCALE_ID, useValue: 'pt-BR'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
