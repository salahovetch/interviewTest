import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login/login.component';
import { ProductsComponent } from './products/products/products.component';

const routes: Routes = [
  {path:"",component:LoginComponent},

  {path:"products",component:ProductsComponent,canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
