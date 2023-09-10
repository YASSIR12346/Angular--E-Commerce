import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { Orders } from '../models/orders.model';
const STORE_BASE_URL = 'http://localhost:8080/api/auth';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private httpClient:HttpClient) {

   }
   saveOrders(orders:Orders,token:string){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

  const requestOptions = { headers: headers };
    this.httpClient.post<any>("api/saveOrders",orders,requestOptions).subscribe((data)=>{
      console.log(data);
    })
  }
   getAllProducts(
    limit = '4',
    sort = 'desc',
    category: string
  ): Observable<Product[]> {
    return this.httpClient.get<Array<Product>>(
      `api/auth/products?sort=${sort}&limit=${limit}&category=${category}`
    );
  }
  getProductById(id:number): Observable<Product> {
    return this.httpClient.get<Product>(
      `api/auth/getProductById?id=${id}`
    );
  }
  getLatestProducts( ): Observable<Product[]> {
    return this.httpClient.get<Array<Product>>(
      `api/auth/products/latest`
    );
  }
  getDiscountProducts( ): Observable<Product[]> {
    return this.httpClient.get<Array<Product>>(
      `api/auth/products/discount`
    );
  }
  getRecommendations( categories=""): Observable<Product[]> {
    return this.httpClient.get<Array<Product>>(
      `api/auth/products/recommendation?categories=${categories}`
          );
  }
  getRelatedProducts(category:string): Observable<Product[]> {
    return this.httpClient.get<Array<Product>>(
      `api/auth/getRelatedProducts?category=${category}`
          );
  }
  getPredictedProducts(category:string): Observable<Product[]> {
    return this.httpClient.get<Array<Product>>(
      `api/auth/getPredictedProducts?category=${category}`
          );
  }

  getAllCategories(): Observable<string[]> {
    return this.httpClient.get<string[]>(
      `api/auth/categories`
    );
  }
  

}
