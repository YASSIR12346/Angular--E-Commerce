import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { ContactService } from '../services/contact.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent  implements OnInit{
  subject="";
  message="";
  token:string="";
  user_id:number = 0;
  constructor(private loginService:LoginService,private contactService:ContactService,private router:Router) {
    
   }
  
  ngOnInit(): void {
    this.loginService.currentUser.subscribe((data)=>{
      this.user_id = data.id!;
      this.token=data.token!;
    });
    
  }

  Contact(contactForm: NgForm) {
    this.contactService.saveContact({
      subject:this.subject,message:this.message,user_id:this.user_id},
      this.token);
    contactForm.reset();
    this.router.navigate(['/home']);


}

}
