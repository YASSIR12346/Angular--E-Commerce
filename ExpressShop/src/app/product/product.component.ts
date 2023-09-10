import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../models/product.model';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';
const ROWS_HEIGHT: { [id: number]: number } = { 1: 400, 3: 335, 4: 350 };
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit,OnDestroy{
  cols: number = 3;
  rowHeight: number = ROWS_HEIGHT[this.cols];
  category:string="";
  products: Product[] = [];
  sort: string = 'desc';
  count: string = '12';
  productsSubscription: Subscription | undefined;

  constructor(private cartService :CartService,private productService:ProductService){

  }
  ngOnInit(): void {
    this.getProducts();
  }


  getProducts(): void {
    this.productsSubscription = this.productService
      .getAllProducts(this.count, this.sort,this.category)
      .subscribe((_products) => {
        this.products = _products;
      });
  }

  onItemsCountChange(newcount: number): void {
    this.count = newcount.toString();
    this.getProducts();
  }

  onSortChange(newSort: string): void {
    this.sort = newSort;
    this.getProducts();
  }
  onColumnsCountChange(colsNum:number):void{
    this.cols=colsNum;
    this.rowHeight = ROWS_HEIGHT[colsNum];
  }
  onShowCategory(newcategory:string):void{
    this.category=newcategory;
    this.getProducts();
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
