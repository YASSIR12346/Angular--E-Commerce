import { Component } from '@angular/core';
import { CarouselConfig } from 'ngx-bootstrap/carousel';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  providers:[ { provide: CarouselConfig, useValue: { interval: 3000, noPause: true, showIndicators: true } }]
})
export class CarouselComponent {

}
