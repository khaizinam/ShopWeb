import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { CategoryService } from '../../services/category.service';
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
  category : any = [];

  bannerList = [
    'img/trang-chu/silde-show/silde-trang-chu-1.jpg'
  ];

  ngOnInit() {
    this.categoryService.getAll().subscribe((data:any )=> {
      this.category = data;
      console.log(data);
      
    });
  }
}
