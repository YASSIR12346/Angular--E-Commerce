import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { localStorageToken } from '../localstorage.token';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isLoggedIn=new BehaviorSubject<boolean>(false);
  currentUser=new BehaviorSubject<User>({id:0,email:'',password:''});
  constructor(private httpClient:HttpClient,@Inject(localStorageToken) private localStorage: Storage) {
    let x=localStorage.getItem('isLoggedIn');
    let y=x!==null?JSON.parse(x):false;
    this.isLoggedIn=new BehaviorSubject<boolean>(y);
    x=localStorage.getItem('currentUser');
    y=x!==null?JSON.parse(x):{email:'',password:''};
    this.currentUser=new BehaviorSubject<User>(y);
   }

  loginUser(user:User): Observable<any>{
    return this.httpClient.post<any>("api/auth/authenticate",user);
  }
  validateUser(user:User){
    this.isLoggedIn.next(true);
    this.currentUser.next(user);
    this.localStorage.setItem('isLoggedIn', JSON.stringify(this.isLoggedIn.value));
    this.localStorage.setItem('currentUser', JSON.stringify(this.currentUser.value));
  }

}
