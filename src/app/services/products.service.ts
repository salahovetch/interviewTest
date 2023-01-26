import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  baseUrl = 'https://fakestoreapi.com/';
  constructor(private http: HttpClient) { }

  isLoggedIn() {
    if (localStorage.getItem("userType")) {
      return true;
    }
    else {
      return false;
    }
  }

  getAllProducts() {
    return this.http.get(this.baseUrl + "products");
  }

  addProduct(body) {
    return this.http.post(this.baseUrl + "products",body);
  }

  editProduct(body,productId) {
    return this.http.put(this.baseUrl + "products/" + productId,body);
  }
  deleteProduct(productId) {

    return this.http.delete(this.baseUrl + "products/" + productId);
  }

  getAllCategories() {
    return this.http.get(this.baseUrl + "products/categories");
  }

}
