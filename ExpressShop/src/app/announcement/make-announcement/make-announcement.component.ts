import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AnnouncementService } from 'src/app/services/announcement.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-make-announcement',
  templateUrl: './make-announcement.component.html',
  styleUrls: ['./make-announcement.component.scss']
})
export class MakeAnnouncementComponent implements OnInit {
  constructor(private router:Router,private httpClient: HttpClient,private announcementservice:AnnouncementService,private loginService:LoginService) {}
  token:string="";
  email:string="";
  number:string="";
  adress:string="";
  city="Safi";
  aprice:number=1;
  atitle:string="";
  adescription:string="";
  category:string="Vehicles";
  transaction:string="Sell";
  condition:string="New";


  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;

  id:number=0;
  selectedFile: File|any;

  message: string|any;
  imageName: any;
  
  ngOnInit(): void {
    this.loginService.currentUser.subscribe((data)=>{
      this.token=data.token!;
    });
  }
 
  public onFileChanged(event:any) {
    this.selectedFile = event.target.files[0];
  }


  announce(announcementForm:NgForm){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });
  const requestOptions = { headers: headers };
    this.announcementservice.makeAnnouncement({price:this.aprice,title:this.atitle,description:this.adescription,
      category:this.category,transaction:this.transaction,number:this.number,email:this.email,adress:this.adress,
      city:this.city,condition:this.condition},this.token).subscribe((data)=>{
    this.imageName=this.selectedFile.name;
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
    this.httpClient.post(`api/auth/image/upload?id=${data}`, uploadImageData)
      .subscribe((response) => {
      }
      );
      });
      this.router.navigate(['/announcement']);

  }
  getImage() {
    this.httpClient.get('api/auth/image/geT/' + this.imageName)
      .subscribe(
        res => {
          this.retrieveResonse = res;
          this.base64Data = this.retrieveResonse.picByte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        }
      );
  }
}
