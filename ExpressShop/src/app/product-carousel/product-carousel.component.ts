import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Ad } from '../models/ad.model';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-product-carousel',
  templateUrl: './product-carousel.component.html',
  styleUrls: ['./product-carousel.component.scss']
})
export class ProductCarouselComponent {
 @Input () products:Product[]=[];
 @Input () title:string="";
 @Output() addToCart = new EventEmitter();

  itemsPerSlide = 5;
  singleSlideOffset = true;
  noWrap = true;

  onAddToCart(product:Product):void{
    this.addToCart.emit(product);

  }

}
