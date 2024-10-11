import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { Route, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{
  public cartData:any[] = [];
  public user: any = { id:0 };
  public numItem = 0;
  public totalPrice = 0;
  constructor(
    private cartService:CartService,
    private authService:AuthService,
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

  public updateQty(item:any,mode=false){
    if(!mode){
      item.qty -= 1;
      if(item.qty < 1) item.qty = 1;
    }else {
      item.qty += 1;
      if(item.qty > 99) item.qty = 99;
    }
    item.total = parseInt(item.cost) * parseInt(item.qty);

    this.cartService.update(item).subscribe(
      (response) => {
        if(response){
          console.log("update card success !");
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

  public deleteCart(item:any){
    this.cartService.delete(item.id).subscribe(
      (response) => {
        if(response){
          this.cartData = this.cartData.filter((el:any)=> el.id !== item.id);
          alert("deleted item success !");
        }
      },
      (error:any) => {
        console.error(error);
      })
  }
}
