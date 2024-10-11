import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    FormsModule
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'ShopWeb';
  userCookieExists: boolean = false;
  userLogin: any = null;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.checkUserCookie();
  }

  checkUserCookie() {
    const userCookie = this.authService.getUser();
    if (userCookie) {
      this.userCookieExists = true;
      this.userLogin = JSON.parse(userCookie);
      console.log('User cookie exists:', userCookie);
    } else {
      this.userCookieExists = false;
      console.log('User cookie does not exist');
    }
  }
}
