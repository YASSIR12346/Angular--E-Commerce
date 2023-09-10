import { Component, Input } from '@angular/core';
import { Ad } from 'src/app/models/ad.model';

@Component({
  selector: 'app-advertising-box',
  templateUrl: './advertising-box.component.html',
  styleUrls: ['./advertising-box.component.scss']
})
export class AdvertisingBoxComponent {
  @Input() ad: Ad |undefined;
  
}
