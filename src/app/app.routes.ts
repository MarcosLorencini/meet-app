import { Routes } from '@angular/router'
import { HomeComponent } from './home/home.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { RestaurantDetailComponent } from './restaurant-detail/restaurant-detail.component';
import { ReviewsComponent } from 'app/restaurant-detail/reviews/reviews.component';
import { MenuComponent } from 'app/restaurant-detail/menu/menu.component';
import { OrderSummaryComponent } from 'app/order-summary/order-summary.component';
import { NotFoundComponent } from 'app/not-found/not-found.component';

export const ROUTES: Routes = [
    {path: '', component: HomeComponent},
    {path: 'restaurants', component: RestaurantsComponent},
    {path: 'restaurants/:id', component: RestaurantDetailComponent,
        children: [
            {path: '', redirectTo: 'menu', pathMatch: 'full'},
            {path: 'menu', component: MenuComponent},
            {path: 'reviews', component: ReviewsComponent},
        ]},
    {path: 'order', loadChildren: './order/order.module#OrderModule'},
    {path: 'order-summary', component: OrderSummaryComponent},
    //quando about for acionado vai carregar o caminho de about 
    {path: 'about', loadChildren: './about/about.module#AboutModule'}, //carregado apenas de forma tardia, somente quando o compon for acionado
    {path: '**', component: NotFoundComponent}// +generica por ultimo 404
]

