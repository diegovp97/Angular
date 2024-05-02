import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../guards/auth';
import { CommonModule, NgIf } from '@angular/common';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, HttpClientModule, RouterLink, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  newUser = { email: '', password: '' };

  constructor(private authService: AuthService) {}

  register() {
    if (this.newUser.email && this.newUser.password) {
      this.authService.register(this.newUser.email, this.newUser.password).then(response => {
        console.log('Registration successful', response);
        alert('Registration Successful!');
      }).catch(error => {
        console.error('Registration failed', error);
        alert('Registration Failed');
      });
    }
  }
}