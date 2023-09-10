import { ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ad } from '../models/ad.model';
import { Product } from '../models/product.model';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../services/login.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit ,OnDestroy{
  productsSubscription: Subscription | undefined;
  ads:Ad[]=[];
  latestproducts: Product[] = [];
  discountproducts: Product[] = [];
  predictedproducts: Product[] = [];
  isLoggedIn:boolean=false;
  user_id:number = 0;
  constructor(private loginService:LoginService,private httpClient:HttpClient,private cartService :CartService,private productService:ProductService) {}
 
  ngOnInit(): void {
    this.loginService.isLoggedIn.subscribe((isLoggedIn)=>this.isLoggedIn=isLoggedIn);
    this.loginService.currentUser.subscribe((data)=>{
      this.user_id = data.id!;
    });
    this.ads=[
      {
        subject:"New Arrivals",
        image:"assets/ad-new-arrivals.jpeg"
      },
      {
        subject:"Shop By Category",
        image:"assets/ad-shop-by-category.jpg"
      },
   
    {
      subject:"Big Promotions",
      image:"assets/ad-big-promotions.webp"
    },
    {
      subject:"Electronics",
      image:"assets/ad-electronics.jpeg"
    },
    {
      subject:"Super Deals",
      image:"assets/ad-super-deals.webp"
    },
 
    {
      subject:"Clothing",
      image:"assets/ad-clothing.jpg"
    },
    {
      subject:"Top Sellers",
      image:"assets/ad-sellers.jpg"
    },
   
   
  
    {
      subject:"Events",
      image:"assets/ad-events.jpg"
    }]
    this.getLatestProducts();
    this.getDiscountProducts();
    if(this.isLoggedIn){
      this.getPredictedCategory(this.user_id);
    }
   
  }
  getPredictedCategory(client_id:number){
    let category;
    this.httpClient.get('http://127.0.0.1:8000/predict/'+client_id).
     subscribe((data:any)=>{
      console.log(data.category);
      this.productsSubscription = this.productService
      .getPredictedProducts(data.category)
      .subscribe((_products) => {
        this.predictedproducts = _products;
      });
     });
   }

  getLatestProducts(): void {
    this.productsSubscription = this.productService
      .getLatestProducts()
      .subscribe((_products) => {
        this.latestproducts = _products;
      });
  }

  getDiscountProducts(): void {
    this.productsSubscription = this.productService
      .getDiscountProducts()
      .subscribe((_products) => {
        this.discountproducts = _products;
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
