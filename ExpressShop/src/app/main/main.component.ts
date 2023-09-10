import { Component, Input, OnInit } from '@angular/core';
import { Cart, CartItem } from '../models/cart.model';
import { CartService } from '../services/cart.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  constructor(private cartService:CartService,private loginService:LoginService){
  }
   _cart: Cart = { items: [] };
  itemsQuantity = 0;
  opened=false;
  isLoggedIn:boolean=false;
  ngOnInit(): void {
    this.loginService.isLoggedIn.subscribe((isLoggedIn)=>this.isLoggedIn=isLoggedIn);
    this.cartService.cart.subscribe((cart) => {
      this._cart=cart;
      this.itemsQuantity = cart.items
      .map((item) => item.quantity)
      .reduce((prev, current) => prev + current, 0);
    });
  }
  getTotal():number{
    return this.cartService.getTotal();
  }
  onClearCart():void{
    this.cartService.clearCart();
  }

}
