import { Component, OnDestroy, OnInit } from '@angular/core';
import { Announcement } from '../models/announcement.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { AnnouncementService } from '../services/announcement.service';

@Component({
  selector: 'app-announcement-page',
  templateUrl: './announcement-page.component.html',
  styleUrls: ['./announcement-page.component.scss']
})
export class AnnouncementPageComponent implements OnInit,OnDestroy{
  relatedannouncements: Announcement[] = [];
  announcementsSubscription: Subscription | undefined;
  id=0;
  fullWidthMode = true;
  announcement:Announcement|any;
  constructor(private router:ActivatedRoute,private announcementService:AnnouncementService){}
  
  ngOnInit(): void {
    this.router.params.subscribe(params=>{
      this.id=params['id'];
      this.getAnnouncementById();
  })
}

  getAnnouncementById() {
    this.announcementsSubscription = this.announcementService
    .getAnnouncementById(this.id)
    .subscribe((_announcement) => {
      this.announcement = _announcement;
      this.announcement.image ='data:image/jpeg;base64,'+this.announcement.image; 
      console.log(this.announcement);
    });
   
  }

  ngOnDestroy(): void {
    
  }

}



