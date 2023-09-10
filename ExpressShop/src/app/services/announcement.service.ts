import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Announcement } from '../models/announcement.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {

  constructor(private httpClient:HttpClient) { }

  getAnnouncements(price:string,date:string,category:string,location:string,transaction:string,condition:string): Observable<Announcement[]> {
    return this.httpClient.get<Array<Announcement>>(
      `api/auth/announcements?price=${price}&date=${date}&category=${category}&location=${location}&transaction=${transaction}&condition=${condition}`
    );
  }
  getAnnouncementById(id:number): Observable<Announcement> {
    return this.httpClient.get<Announcement>(
      `api/auth/getAnnouncementById?id=${id}`
    );
  }
  makeAnnouncement(announcement:Announcement,token:string):Observable<any>{
    let id:number=0;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

  const requestOptions = { headers: headers };
    return this.httpClient.post<any>("api/make-announcement",announcement,requestOptions);
  }
  getImages():Observable<any> {
   return  this.httpClient.get<any>('api/auth/image/getImages')
  }
}
