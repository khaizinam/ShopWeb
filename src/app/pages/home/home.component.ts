import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { CategoryService } from '../../services/category.service';
import { forkJoin, map } from 'rxjs';

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
    private productService: ProductsService,
    private categoryService: CategoryService,
  ){}
  categories : any = [];

  ngOnInit() {
    this.categoryService.getAll().subscribe(
      (data: any[]) => {
        this.categories = data;
        const productRequests = this.categories.map((element: any) =>
          this.productService.getByCategory(element.id).pipe(
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
}
