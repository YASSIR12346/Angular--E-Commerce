import { Inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from '../models/cart.model';
import { localStorageToken } from '../localstorage.token';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart=new BehaviorSubject<Cart>({items:[]});
  constructor(private _snackBar: MatSnackBar,@Inject(localStorageToken) private localStorage: Storage) {
    let x=localStorage.getItem('cart');
    let y=x!==null?JSON.parse(x):{items:[]};
    this.cart=new BehaviorSubject<Cart>(y);
   
   }

   removeQuantity(item:CartItem):void{
    let itemForRemoval!: CartItem;
    let filteredItems = this.cart.value.items.map((_item) => {
      if (_item.id === item.id) {
        _item.quantity--;
        if (_item.quantity === 0) {
          itemForRemoval = _item;
        }
      }
      return _item;
    });
    if (itemForRemoval) {
     filteredItems=this.removeFromCart(itemForRemoval);
    }
    this.cart.next({ items: filteredItems })
    this.localStorage.setItem('cart', JSON.stringify(this.cart.value));
    this._snackBar.open('1 item removed from cart.', 'Ok', {
      duration: 3000,
    });
   }
   removeFromCart(item: CartItem): Array<CartItem> {
    const filteredItems = this.cart.value.items.filter(
      (_item) => _item.id !== item.id
    );
    this.cart.next({ items: filteredItems });
    this.localStorage.setItem('cart', JSON.stringify(this.cart.value));
  return filteredItems;
  }  
   addToCart(item: CartItem): void {
    const items = [...this.cart.value.items];

    const itemInCart = items.find((_item) => _item.id === item.id);
    if (itemInCart) {
      itemInCart.quantity += 1;
    } else {
      items.push(item);
    }

    this.cart.next({ items });
    this.localStorage.setItem('cart', JSON.stringify(this.cart.value));
    this._snackBar.open('1 item added to cart.', 'Ok', { duration: 3000 });
   
  }



  getTotal():number {
    return this.cart.value.items.map(t => t.price * t.quantity).reduce((acc, value) => acc + value, 0);
  }
  clearCart(): void {
    this.cart.next({ items: [] });
    this.localStorage.setItem('cart', JSON.stringify(this.cart.value));
    this._snackBar.open('Cart is cleared.', 'Ok', {
      duration: 3000,
    });
   
  }
 
}
