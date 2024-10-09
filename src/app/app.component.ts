import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'ShopWeb';
  userCookieExists: boolean = false;
  userLogin: any = null;
  constructor() {}

  ngOnInit() {
    this.checkUserCookie();
  }

  checkUserCookie() {
    const userCookie = this.getCookie('user');
    if (userCookie) {
      this.userCookieExists = true;
      this.userLogin = JSON.parse(userCookie);
      console.log('User cookie exists:', userCookie);
    } else {
      this.userCookieExists = false;
      console.log('User cookie does not exist');
    }
  }

  private getCookie(name: string): string | null {
    const match = document.cookie.match(new RegExp('(^|; )' + name + '=([^;]*)'));
    return match ? decodeURIComponent(match[2]) : null; // Return the cookie value or null
  }
}
