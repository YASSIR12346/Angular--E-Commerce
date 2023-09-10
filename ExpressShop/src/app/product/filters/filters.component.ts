import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnDestroy{
  @Output() showCategory = new EventEmitter<string>();
  categories:string[]=[];
  categoriesSubscription: Subscription | undefined;
  constructor(private productService: ProductService) { 
    this.categoriesSubscription = this.productService.getAllCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  onShowCategory(category: string): void {
    this.showCategory.emit(category);
  }
  ngOnDestroy(): void {
    if (this.categoriesSubscription) {
      this.categoriesSubscription.unsubscribe();
    }
  }
 
}
