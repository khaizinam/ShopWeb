import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
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
  bannerList = [
    'img/trang-chu/silde-show/silde-trang-chu-1.jpg'
  ];
  ngOnInit() {

  }
}
