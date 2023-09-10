import { Component, Input, OnInit } from '@angular/core';
import { Announcement } from 'src/app/models/announcement.model';

@Component({
  selector: 'app-announcement-box',
  templateUrl: './announcement-box.component.html',
  styleUrls: ['./announcement-box.component.scss']
})
export class AnnouncementBoxComponent implements OnInit {
  
  @Input() fullWidthMode = false;
  @Input() announcement: Announcement |undefined;

  ngOnInit(): void {

  }

}
