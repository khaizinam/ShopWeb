import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { CategoryService } from '../../services/category.service';
import { forkJoin, map } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})

export class HomeComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private productService: ProductsService,
    private categoryService: CategoryService,
    private cartService: CartService
  ){}
  categories : any = [];

  ngOnInit() {
    this.categoryService.getAll().subscribe(
      (data: any[]) => {
        this.categories = data;
        const productRequests = this.categories.map((element: any) =>
          this.productService.getBy(`category_id=${element.id}`).pipe(
            // Map response to the element to attach products
            map((products: any[]) => ({ ...element, products }))
          )
        );

        // Use forkJoin to wait for all requests to complete
        forkJoin(productRequests).subscribe(
          (categoriesWithProducts) => {
            this.categories = categoriesWithProducts; // Update categories with products
          },
          (error: any) => {
            console.error('Error fetching products:', error); // Handle product fetching error
          }
        );
      },
      (error: any) => {
        console.error('Error fetching categories:', error); // Handle category fetching error
      }
    );
  }

  public addCart(item:any){
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
