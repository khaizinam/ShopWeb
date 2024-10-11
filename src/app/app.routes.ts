import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductComponent } from './pages/product/product.component';
import { PolicyComponent } from './pages/policy/policy.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AboutComponent } from './pages/about/about.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { CartComponent } from './pages/cart/cart.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { provideHttpClient } from '@angular/common/http';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { CheckoutSuccessComponent } from './pages/checkout-success/checkout-success.component';
export const routes: Routes = [
  { path: '', component: HomeComponent },
  // { path: 'product/:id', component: ProductComponent },
  { path: 'product-detail/:id', component: ProductDetailComponent },
  { path: 'policy', component: PolicyComponent },
  { path: 'cart', component: CartComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'checkout-success/:id', component: CheckoutSuccessComponent },
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent },
];
export const appConfig = {
  providers: [provideHttpClient()],
};
