import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { LoginGuard } from './guards/login.guard';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { ContactComponent } from './contact/contact.component';
import { AnnouncementComponent } from './announcement/announcement.component';
import { MakeAnnouncementComponent } from './announcement/make-announcement/make-announcement.component';
import { AnnouncementPageComponent } from './announcement-page/announcement-page.component';

const routes: Routes = [
  {path:'product',component:ProductComponent},
  {path:'contact',component:ContactComponent,canActivate:[LoginGuard]},
  {path:'announcement',component:AnnouncementComponent},
  {path:'make-announcement',component:MakeAnnouncementComponent,canActivate:[LoginGuard]},
  {path:'cart',component:CartComponent},
  {path:'home',component:HomeComponent},
  {path:'productpage/:id',component:ProductPageComponent},
  {path:'announcementpage/:id',component:AnnouncementPageComponent},
  {path:'',redirectTo:'home',pathMatch:'full'},
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: 'register', loadChildren: () => import('./register/register.module').then(m => m.RegisterModule) },
  { path: 'checkout', loadChildren: () => import('./checkout/checkout.module').then(m => m.CheckoutModule),canActivate:[LoginGuard]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
