import { Injectable } from '@angular/core'

import { ShoppingCartService } from 'app/restaurant-detail/shopping-cart/shopping-cart.service';
import { CarItem } from 'app/restaurant-detail/shopping-cart/cart-item.model';
import { Order, OrderItem } from 'app/order/order.model';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http'
import 'rxjs/add/operator/map'
import { MEAT_API } from '../app.api'



@Injectable()
export class OrderService {

    constructor(private cartService: ShoppingCartService, private http: HttpClient){}

    itemsValue(): number {
        return this.cartService.total()
    }

    cartItems(): CarItem[] {
        return this.cartService.items
    }

    increaseQty(item: CarItem){
        this.cartService.increaseQty(item)
    }

    decreaseQty(item: CarItem){
        this.cartService.decreaseQty(item)
    }

    remove(item: CarItem){
        this.cartService.removeItem(item)
    }

    clear(){
        this.cartService.clear()
    }



    checkOrder(order: Order): Observable<string>{
        return this.http.post<Order>(`${MEAT_API}/orders`,order)
            .map(order => order.id)//recebi um obj order e devolve um order.id (id do produto)

        }

}
