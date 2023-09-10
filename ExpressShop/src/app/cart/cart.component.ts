import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Cart, CartItem } from '../models/cart.model';
import { Product } from '../models/product.model';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';
import { HttpClient } from '@angular/common/http';
import { loadStripe } from '@stripe/stripe-js';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit,OnDestroy{
  recommendedproducts: Product[] = [];
  productsSubscription: Subscription | undefined;
 
constructor(private loginService:LoginService,private cartService:CartService,private productService:ProductService,private http:HttpClient,private Router:Router) { 

}
onProceed():void{
  this.loginService.isLoggedIn.subscribe((data)=>{
    if(data){
     this.onCheckout();
    }else{
      this.Router.navigate(['/login']);
    }
  });
  
}

onCheckout():void{
      this.http.post('http://localhost:4242/checkout',{
        items:this.cart.items,
      }) .subscribe(async (res: any) => {
        let stripe = await loadStripe('pk_test_51MykJnDtK33ApdrHmQu3ivOB5cQLz2w7FIItOzeJLnnl22Yt1MVg7YKjxPLxsYKXKOVoNHYuVAk5ffnse6euZwzT00IKQDcAVq');
        stripe?.redirectToCheckout({
          sessionId: res.id,
        });
      });
    }

  displayedColumns: string[] = [
    'product',
    'name',
    'price',
    'quantity',
    'total',
    'action',
  ];

  cart: Cart = { items: [{
    product: "",
    name: "",
    price: 1,
    category:"",
    quantity: 1,
    id: 1

  },
 ] };
  dataSource: CartItem[] = [];
  ngOnInit(): void {
    this.cartService.cart.subscribe((_cart:Cart) => {
      this.cart = _cart;
      this.dataSource = this.cart.items;
    });
    this.getRecommendations(this.getCategories());
  
  }
  onAddToCart(product:Product):void{
    this.cartService.addToCart({
      id:product.id,
      quantity:1,
      name:product.title,
      price:product.price,
      product:product.image,
      category:product.category
    });
  }
  getCategories():string{
    let result="";
    for(let item of this.cart.items){
      result+=item.category+",";
    }
    return result;
  }

  getRecommendations(categories:string): void {
    this.productsSubscription = this.productService
      .getRecommendations(categories)
      .subscribe((_products) => {
        this.recommendedproducts = _products;
      });
  }

  getTotal():number {
    return this.cartService.getTotal();
  }
  onClearCart():void{
    this.cartService.clearCart();
  }
  onRemoveFromCart(item:CartItem):void{
   this.cartService.removeFromCart(item);
  }
  onAddQuantity(item:CartItem):void{
    this.cartService.addToCart(item);
  }
  onRemoveQuantity(item:CartItem):void{
  
    this.cartService.removeQuantity(item);
  }
  ngOnDestroy(): void {
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }
  }

}
