import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent  implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router // Inject the Router
  ){}

  public email :string = "";
  public pass :string = "";
  public repass :string = "";
  public phone :string = "";
  public address :string = "";
  public name :string = "";

  ngOnInit() {

  }

  public register() {
    console.log(!this.email);

    if(!this.email || !this.pass || !this.phone || !this.address || !this.name){
      return ;
    }
    if(!this.pass !== !this.repass){
      return ;
    }
    const payload = {
      email: this.email,
      pass: this.pass,
      phone : this.phone,
      address: this.address,
      name: this.name,
    };

    // Assuming your AuthService has a login method
    this.authService.store(payload).subscribe(
      (response:any | []) => {
        if(response){
          document.cookie = `user=${encodeURIComponent(JSON.stringify(response))}; path=/;`;
          this.router.navigate(['/login']); // Change to your desired route
        }

      },
      (error:any) => {
        console.error('Login failed:', error);
        // Handle login failure (e.g., show an error message)
      }
    );
  }
}
