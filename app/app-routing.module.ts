import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { HomeComponent } from './Components/home/home.component';
import { ProductsComponent } from './Components/products/products.component';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';
import { CartComponent } from './Components/cart/cart.component';
import { EditProductComponent } from './Components/edit-product/edit-product.component';
import { AddProductComponent } from './Components/add-product/add-product.component';
import { LoginComponent } from './Components/login/login.component';
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { registerLocaleData } from '@angular/common';
import { RegisterComponent } from './Components/register/register.component';

const routes: Routes = [
  { path: "Dashboard", component: DashboardComponent },
  { path: "Products", component: ProductsComponent },
  { path: "Details/:pid", component: ProductDetailsComponent },
  { path: "Home", component: HomeComponent },
  { path: "Cart", component: CartComponent },
  { path: "editProduct/:prdid", component: EditProductComponent },
  { path: "addProduct", component: AddProductComponent },
  { path: "login",component:LoginComponent},
    { path: "Register", component: RegisterComponent },
  { path: "", redirectTo: "Home", pathMatch: "full" },
  { path: "**", component: PageNotFoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
