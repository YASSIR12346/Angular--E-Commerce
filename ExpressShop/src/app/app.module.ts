import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTreeModule } from '@angular/material/tree';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './main/main.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProductComponent } from './product/product.component';
import { ProductsHeaderComponent } from './product/products-header/products-header.component';
import { FiltersComponent } from './product/filters/filters.component';
import { ProductBoxComponent } from './product/product-box/product-box.component';
import { CartComponent } from './cart/cart.component';
import { EmailValidator, FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { CarouselComponent } from './home/carousel/carousel.component';
import { AdvertisingBoxComponent } from './home/advertising-box/advertising-box.component';
import { ProductCarouselComponent } from './product-carousel/product-carousel.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { ContactComponent } from './contact/contact.component';
import { AnnouncementComponent } from './announcement/announcement.component';
import { AnnouncementFilterComponent } from './announcement/announcement-filter/announcement-filter.component';
import { AnnouncementBoxComponent } from './announcement/announcement-box/announcement-box.component';
import { MakeAnnouncementComponent } from './announcement/make-announcement/make-announcement.component';
import {MatSelectModule} from '@angular/material/select';
import { SharedModule } from './Validators/shared/shared.module';
import { AnnouncementPageComponent } from './announcement-page/announcement-page.component';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ProductComponent,
    ProductsHeaderComponent,
    FiltersComponent,
    ProductBoxComponent,
    CartComponent,
    HomeComponent,
    CarouselComponent,
    AdvertisingBoxComponent,
    ProductCarouselComponent,
    ProductPageComponent,
    ContactComponent,
    AnnouncementComponent,
    AnnouncementFilterComponent,
    AnnouncementBoxComponent,
    MakeAnnouncementComponent,
    AnnouncementPageComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSidenavModule,
    MatGridListModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatExpansionModule,
    MatTreeModule,
    MatListModule,
    MatToolbarModule,
    MatTableModule,
    MatBadgeModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatFormFieldModule,
    HttpClientModule,
    FormsModule,
    MatSelectModule,
    SharedModule,
    CarouselModule.forRoot(),
  
  ],
  providers: [
   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
