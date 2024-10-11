import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CheckoutService } from '../../services/checkout.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit{
  public cartData:any[] = [];
  public user: any = { id:0 };
  public numItem = 0;
  public totalPrice = 0;
  public phone = "";
  public name = "";
  public email = "";
  public address = "";
  public message = "";
  constructor(
    private cartService:CartService,
    private authService:AuthService,
    private checkoutService: CheckoutService,
    private router :Router
  ){

  }
  ngOnInit(): void {
    this.getCartData();
  }

  private getCartData(){
    const userCookie =  this.authService.getUser();
    if(!userCookie) {
      this.router.navigate(['/login']);
      return
    }
    this.user = JSON.parse(userCookie);

    this.email = this.user.email;
    this.name = this.user.name;
    this.address = this.user.address;
    this.phone = this.user.phone;

    this.cartService.getBy(`user_id=${this.user.id}`).subscribe(
      (response:any | []) => {
        if(response && response.length > 0){
          this.cartData = response;
          this.numItem = response.length;
          this.getTotalPrice();
        }
      },
      (error:any) => {
        console.error(error);
      }
    );
  }

  public formatCost(amount:any) {
      return `${parseInt(amount).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  }

  public getTotalPrice(){
    this.cartData.forEach(element => {
      this.totalPrice += parseInt(element.total);
    });
  }

  public async chechkout(){
    const payload = {
      use_id : this.user.id,
      items : this.cartData,
      user_name : this.name,
      user_email : this.email,
      user_address : this.address,
      user_phone : this.phone,
      user_message : this.message,
      totalPrice : this.totalPrice,
      shippingPrice : 0
    }
    try {
      const res = await lastValueFrom(this.checkoutService.store(payload));
      for (const item of this.cartData) {
        try {
          const newRes = await lastValueFrom(this.cartService.delete(item.id));
        } catch (error) {
          console.error(`Error deleting item with id ${item.id}:`, error);
        }
      }
      alert("Thanh toán thành công!");
      window.location.href = `/checkout-success/${res.id}`;
    } catch (error) {
      console.error(error)
    }
  }
}
