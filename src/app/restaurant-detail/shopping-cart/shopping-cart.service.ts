import { CarItem } from "app/restaurant-detail/shopping-cart/cart-item.model";
import { MenuItem } from "app/restaurant-detail/menu-item/menu-item.model";
import { Injectable } from "@angular/core";
import { NotificationService } from "app/shared/messages/notification.service";

@Injectable()// sera usado para injetar o service NotificationService 
export class ShoppingCartService {
    items: CarItem[] = []

    constructor(private notifactionService : NotificationService){}

    clear(){
        this.items = []
    }

    addItem(item:MenuItem){//add o intem no carrinho do menu
        //verifica se um item já se encontra dentro do carrinho
        let foundItem = this.items.find((mItem)=>mItem.menuItem.id == item.id)//se o id recebido existe no items
        if(foundItem){
            this.increaseQty(foundItem)// se ja existe
        }else{
            this.items.push(new CarItem(item))//item novo
        }
        this.notifactionService.notify(`Você adicionou o item ${item.name}`)
    }

    increaseQty(item: CarItem){
        item.quantity = item.quantity + 1
    }

    decreaseQty(item: CarItem){
        item.quantity = item.quantity - 1
        if(item.quantity === 0){
            this.removeItem(item)
        }
    }

    removeItem(item:CarItem){//remove o item do carrinho
        this.items.splice(this.items.indexOf(item), 1)// a partir do indice que está remove 1
        this.notifactionService.notify(`Você removeu o item ${item.menuItem.name}`)
       

    }

    total(): number{
        return this.items
            .map(item => item.value())
            .reduce((prev, value)=> prev+value, 0)
        //substitui o cartitem pelo valor do cartitem. o reduce(soma) tem o valor ant e o atual + 0(valor inicial)
    }
}