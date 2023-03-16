import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isLoading = new Subject<boolean>();

  token = '530d9dc1b99da7bde5ca7e33b414b14fd27437f623208b70504cbf060a3641db';
  baseUrl = 'https://gorest.co.in/public/v2/';

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'username': this.token

  })
  constructor(private http: HttpClient) { }

//// User Logic

  getAllUsers() {
    return this.http.get(this.baseUrl + "users", { headers: this.headers });
  }


  addUser(body: any) {
    return this.http.post(this.baseUrl + "users?access-token=" + this.token, body);
  }

  editUser(body: any, userId: any) {
    return this.http.put(this.baseUrl + "users/" + userId + '?access-token=' + this.token, body);
  }
  deleteUser(userId: any) {

    return this.http.delete(this.baseUrl + "users/" + userId + '?access-token=' + this.token);
  }

 

//// posts Logic

getUserPosts(userId) {
  return this.http.get(this.baseUrl + "users/" + userId + "/posts"+ '?access-token=' + this.token);
}


addUserPost(userId,body) {
  return this.http.post(this.baseUrl + "users/" + userId + "/posts" + '?access-token=' + this.token,body);
}
//users/16/posts

deleteUserPost(userId,postId) {

  return this.http.delete(this.baseUrl + "users/" + userId + "/post/" + postId+ '?access-token=' + this.token);
}

  show() {
    this.isLoading.next(true);
  }

  hide() {
    this.isLoading.next(false);
  }


}
