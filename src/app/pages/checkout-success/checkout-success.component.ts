import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CheckoutService } from '../../services/checkout.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout-success.component.html',
  styleUrl: './checkout-success.component.scss'
})
export class CheckoutSuccessComponent implements OnInit{
  public cartData:any[] = [];
  public checkoutData: any = {};
  public user:any;
  public totalPrice = 0;

  constructor(
    private cartService:CartService,
    private authService:AuthService,
    private checkoutService: CheckoutService,
    private router :Router,
    private route : ActivatedRoute
  ){

  }
  ngOnInit(): void {
    this.getData();
  }

  private async getData(){
    try {
      const userCookie = this.authService.getUser();
      if(!userCookie) {
        this.router.navigate(['/login']);
        return
      }
      this.user = JSON.parse(userCookie);
      const res = await lastValueFrom(this.checkoutService.getById(this.route.snapshot.paramMap.get('id')));
      this.cartData = res.items;
      this.getTotalPrice();
    } catch (error) {
      console.error(error)
    }
  }

  public formatCost(amount:any) {
      return `${parseInt(amount).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  }

  public getTotalPrice(){
    this.cartData.forEach(element => {
      this.totalPrice += parseInt(element.total);
    });
  }
}
