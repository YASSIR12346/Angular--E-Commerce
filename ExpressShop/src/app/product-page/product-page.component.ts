import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';
import { Subscription } from 'rxjs';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent  implements OnInit,OnDestroy{
  relatedproducts: Product[] = [];
  productsSubscription: Subscription | undefined;
  id=0;
  fullWidthMode = true;
  product:Product|any;

 constructor(private router:ActivatedRoute,private productService:ProductService,private cartService:CartService,private Router:Router) { 
  }
  ngOnInit(): void {
     this.router.params.subscribe(params=>{
      this.id=params['id'];
      this.getProductById();
     })
     
    
  }
  onAddProductToCart():void{
    this.cartService.addToCart({
      id:this.product.id,
      quantity:1,
      name:this.product.title,
      price:this.product.price,
      product:this.product.image,
      category:this.product.category
    });
    this.Router.navigateByUrl('/cart');
  }

  getRelatedProducts(category:string): void {
    this.productsSubscription = this.productService
      .getRelatedProducts(category)
      .subscribe((_products) => {
        this.relatedproducts = _products;
      });
  }
  getProductById() {
    this.productsSubscription = this.productService
      .getProductById(this.id)
      .subscribe((_product) => {
        this.product = _product;
        this.getRelatedProducts(this.product.category);
      });
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
  ngOnDestroy(): void {
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }
  }
  

}
