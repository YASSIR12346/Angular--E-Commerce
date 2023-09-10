import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { LoginService } from '../services/login.service';
import { ProductService } from '../services/product.service';
import { Cart, CartItem } from '../models/cart.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  items:CartItem[] = [];
  user_id:number = 0;
  token:string="";

  constructor(private cartService:CartService,private productService:ProductService,private loginService:LoginService) { 
    
  }

  ngOnInit(): void {
    this.cartService.cart.subscribe((cart:Cart) => {
      this.items = cart.items;
    })
    this.loginService.currentUser.subscribe((data)=>{
      this.user_id = data.id!;
      this.token=data.token!;
    });
    this.productService.saveOrders({user_id:this.user_id,items:this.items},this.token)
    
    
  }
  getTotal():number{
    return this.cartService.getTotal();
  }


}
