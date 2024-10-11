import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router // Inject the Router
  ){}
  public email :string = "";
  public pass :string = "";

  ngOnInit() { }

  public login() {
    const loginData = {
      email: this.email,
      pass: this.pass
    };

    // Assuming your AuthService has a login method
    this.authService.login(loginData).subscribe(
      (response:any | []) => {
        if(response && response.length > 0){
          document.cookie = `user=${encodeURIComponent(JSON.stringify(response[0]))}; path=/;`;
          // this.router.navigate(['/']); // Change to your desired route
          window.location.href = "/";
        }

      },
      (error:any) => {
        console.error('Login failed:', error);
        // Handle login failure (e.g., show an error message)
      }
    );
  }
}
