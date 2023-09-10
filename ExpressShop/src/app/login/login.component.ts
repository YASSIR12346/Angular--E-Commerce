import { Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from '../services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  implements OnDestroy{

  constructor(private loginService:LoginService,private _snackBar: MatSnackBar,private route:Router) {
  }
  loginSubscription: Subscription | undefined;
  fail:string='';
  email="";
  password="";

  Login(loginForm:NgForm){
    this.loginSubscription =this.loginService.loginUser({
      email:this.email,
      password:this.password,
    }).subscribe((data)=>{
       if(data.message==="Invalid User"){
         this.fail="Invalid User";
       }
       else{
        this.loginService.validateUser({
          id:data.id,
          email:data.email,
          token:data.message
        });
        this.fail="";
        this._snackBar.open('You Are Logged In Successfully.', 'Ok', {
          duration: 3000,
        });
        this.route.navigateByUrl('/home');
       }
   } );
  
  loginForm.reset();
  }

  ngOnDestroy(): void {
    if(this.loginSubscription){
      this.loginSubscription.unsubscribe();
    }
  }

}
