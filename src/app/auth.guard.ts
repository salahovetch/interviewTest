import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductsService } from './services/products.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private productServ:ProductsService,private route:Router){}
  canActivate(): boolean{
    if(this.productServ.isLoggedIn()){
      return true;
    }
    else{
      alert("You Should Login First")
      this.route.navigate([""]); 
      return false;
    }


  }
  
}
