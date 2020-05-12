import { Restaurant } from "app/restaurants/restaurant/restaurant.model";
import { MEAT_API } from '../app.api'
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs/Observable'
import { ErrorHandler } from "app/app.error-handler";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import { MenuItem } from "../restaurant-detail/menu-item/menu-item.model";

@Injectable()
export class RestaurantsService {

    constructor(private http: HttpClient){}
    //{params: {q: search}} = q indica qualquer dado do restaurant. cartegoria, nome..
    restaurants(search?: string): Observable<Restaurant[]> {
        let params: HttpParams = undefined
        if(search){//se vier algo da busca instancia o HttpParams
            params = new HttpParams().set('q', search)
        }
        return this.http.get<Restaurant[]>(`${MEAT_API}/restaurants`, {params: params})
           
     }

     restaurantById(id: string): Observable<Restaurant>{
         return this.http.get<Restaurant>(`${MEAT_API}/restaurants/${id}`)
         
     }

     reviewsOfRestaurant(id: string): Observable<any>{
         return this.http.get(`${MEAT_API}/restaurants/${id}/reviews`)
                 
     }

     menuOfRestaurant(id: string): Observable<MenuItem[]>{
        return this.http.get<MenuItem[]>(`${MEAT_API}/restaurants/${id}/menu`)
        
    }
     

}