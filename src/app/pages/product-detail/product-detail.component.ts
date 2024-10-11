import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { CheckoutService } from '../../services/checkout.service';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit{
  public productData:any;
  public user:any;

  constructor(
    private productService:ProductsService,
    private cartService : CartService,
    private authService:AuthService,
    private router :Router,
    private route : ActivatedRoute
  ){

  }

  async ngOnInit() {
    console.log("call");
    try {
      const res = await lastValueFrom(this.productService.getById(this.route.snapshot.paramMap.get('id')));
      this.productData = res;
    } catch (error) {
      console.error(error)
    }
  }

  public addTocart(){
    const item = this.productData;
    const userCookie = this.authService.getUser();
    if(!userCookie){
      alert("Vui lòng đăng nhập!")
      return;
    }
    const user = JSON.parse(userCookie);
    console.log("--add cart");
    const payload = {
      ...item,
      product_id : item.id,
      user_id : user.id,
      qty : 1,
      created_at : "",
      total : item.cost
    }
    delete payload.id;
    this.checkProductInCart(payload);
  }

  public checkProductInCart(payload:any){
    this.cartService.getBy(`product_id=${payload.product_id}&user_id=${payload.user_id}`).subscribe(
      (response:any) => {
        if(response && response.length > 0){
          alert("Sản phẩm này đã được thêm trước đó!")
        }else {
          this.cartService.store(payload).subscribe(
            (response:any | []) => {
              if(response){
                console.log("--added product to cart");
                alert("Sản phẩm đã được thêm vào giỏ hàng!")
              }
            },
            (error:any) => {
              console.error(error);
            }
          );
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
}
