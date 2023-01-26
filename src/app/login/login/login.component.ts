import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private route:Router) { }
  loginForm: FormGroup;
  showLoader = false;
  ngOnInit(): void {

    this.loginForm = new FormGroup({
      userName: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  login() {
    this.showLoader = true;
    console.log(this.loginForm.value);
    if(this.loginForm.get("userName").value == 'user' && this.loginForm.get("password").value == 'user'){
      localStorage.setItem("userType",'User')
      this.route.navigate(["products"]);
    }
    else if(this.loginForm.get("userName").value == 'admin' && this.loginForm.get("password").value == 'admin'){
      localStorage.setItem("userType",'Admin')
      this.route.navigate(["products"]);
    }
    else{
      this.showLoader = false;
      alert("please contact admin to get username and password")
    }

  }

}
