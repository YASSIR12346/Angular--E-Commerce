import { Component, OnDestroy, OnInit } from '@angular/core';
import { AnnouncementService } from '../services/announcement.service';
import { Subscription } from 'rxjs';
import { Announcement } from '../models/announcement.model';
import { HttpClient } from '@angular/common/http';
const ROWS_HEIGHT: { [id: number]: number } = { 1: 300, 3: 315, 4: 330 };
@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.scss']
})
export class AnnouncementComponent implements OnInit, OnDestroy {
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;

  set:boolean=false;
  cols: number = 3;
  rowHeight: number = ROWS_HEIGHT[this.cols];
  announcements: Announcement[] = [];
  price: string = "Desc"
  location: string = "Location"
  category: string = "Category"
  date: string = "Newest"
  transaction: string = "Transaction"
  condition: string = "Condition"
  announcementsSubscription: Subscription | undefined;

  constructor(private httpClient: HttpClient, private announcementService: AnnouncementService) { }
   ngOnInit(): void {
    this.getAnnouncements(); 
  }

  onColumnsCountChange(colsNum: number): void {
    this.cols = colsNum;
    this.rowHeight = ROWS_HEIGHT[colsNum];
  }
  onDateChanged(newDate: string) {
    this.date = newDate;
    this.getAnnouncements();

  }
  onPriceChanged(newPrice: string) {
    this.price = newPrice;
    this.getAnnouncements();

  }
  onCategoryChanged(newCategory: string) {
    this.category = newCategory;
    this.getAnnouncements();
  }
  onLocationChanged(newLocation: string) {
    this.location = newLocation;
    this.getAnnouncements();
  }
  onConditionChanged(newCondition: string) {
    this.condition = newCondition;
    this.getAnnouncements();
  }
  onTransactionChanged(newTransaction: string) {
    this.transaction = newTransaction;
    this.getAnnouncements();
  }

  getAnnouncements(): void{
    this.announcementsSubscription = this.announcementService
      .getAnnouncements(this.price, this.date, this.category, this.location, this.transaction, this.condition)
      .subscribe( (_announcements) => {
        this.announcements = _announcements;
        for (var announcement of this.announcements) {
          announcement.image ='data:image/jpeg;base64,'+announcement.image; 
      }
      });   
    }
   
  ngOnDestroy(): void {
    if (this.announcementsSubscription) {
      this.announcementsSubscription.unsubscribe();
    }
  }

}
