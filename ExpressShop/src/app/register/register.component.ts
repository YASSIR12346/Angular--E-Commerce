import { Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnDestroy {
  registerSubscription: Subscription | undefined;
  constructor(private registerService:RegisterService,private _snackBar: MatSnackBar) {
  }
  success:string='';
  fail:string='';
  email="";
  password1="";
  password2=""
  fullname="";
  
  Register(registerForm:NgForm){
    if(this.password1===this.password2){
    this.registerSubscription =this.registerService.registerUser({
      email:this.email,
      password:this.password1,
      fullname:this.fullname
    }).subscribe((data)=>{
       if(data.message==="you have been registered Successfully"){
         this.success=data.message;
         this.fail="";
         this._snackBar.open('Now you can login to your Account.', 'Ok', {
          duration: 3000,
        });
       }
       else if(data.message==="Email is already taken"){
        this.fail=data.message;
        this.success="";
       }
   } );
  }
  else{
    this.fail="the two Passwords does not match";
    this.success="";
  }
   registerForm.reset();

  }

  ngOnDestroy(): void {
    if(this.registerSubscription){
      this.registerSubscription.unsubscribe();
    }
  }
}
