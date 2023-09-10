import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contact } from '../models/contact.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  constructor(private httpClient:HttpClient,private _snackBar: MatSnackBar) {}

   saveContact(contact:Contact,token:string){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  const requestOptions = { headers: headers };
    this.httpClient.post<any>("api/saveContact",contact,requestOptions).subscribe((data)=>{
    })
    this._snackBar.open('your message has been successfully saved', 'Ok', { duration: 3000 });
    
   
  }
}
