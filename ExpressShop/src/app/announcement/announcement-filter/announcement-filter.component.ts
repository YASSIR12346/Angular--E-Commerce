import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-announcement-filter',
  templateUrl: './announcement-filter.component.html',
  styleUrls: ['./announcement-filter.component.scss']
})
export class AnnouncementFilterComponent {
  @Output() columnsCountChange = new EventEmitter<number>();
  @Output() priceChange = new EventEmitter<string>();
  @Output() locationChange = new EventEmitter<string>();
  @Output() categoryChange = new EventEmitter<string>();
  @Output() dateChange = new EventEmitter<string>();
  @Output() transactionChange = new EventEmitter<string>();
  @Output() conditionChange = new EventEmitter<string>();
  price:string="Desc"
  location:string="Location"
  category:string="Category"
  date:string="Newest"
  transaction:string="Transaction"
  condition:string="Condition"
  constructor(){}

  onColumnsUpdated(colsNum: number): void {
    this.columnsCountChange.emit(colsNum);
  }
  onPriceChanged(newPrice: string): void {
    this.price = newPrice;
    this.priceChange.emit(newPrice);
  }
  onDateChanged(newDate: string): void {
    this.date = newDate;
    this.dateChange.emit(newDate);
  }
  onLocationChanged(newLocation:string){
    this.location=newLocation;
    this.locationChange.emit(newLocation);
  }
  onCategoryChanged(newCategory:string){
    this.category=newCategory;
    this.categoryChange.emit(newCategory);
  }

  onTransactionChanged(newTransaction:string){
    this.transaction=newTransaction;
    this.transactionChange.emit(newTransaction);
  }
  onConditionChanged(newCondition:string){
    this.condition=newCondition;
    this.conditionChange.emit(newCondition);
  }


}
