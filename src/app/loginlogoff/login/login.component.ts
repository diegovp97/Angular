import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../guards/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule, RouterLink], // Importa FormsModule y HttpClientModule aquí
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  loginObj = { email: '', password: '' };

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login(this.loginObj.email, this.loginObj.password)
      .then((result) => {
        console.log('Login Success');
        const token = result.user.refreshToken; // Acceder al token del usuario
        localStorage.setItem('userToken', token);
        this.router.navigate(['/data']); // Navegar a la página de contenido
      })
      .catch(err => {
        console.error('Login error', err);
        alert('Login Failed'); // Mostrar un mensaje de error
      });
  }

  resetPassword(email: string) {
    if (email) {
      this.authService.resetPassword(email).then(() => {
        alert('Password reset email sent!');
      }).catch(error => {
        console.error('Failed to send password reset email', error);
        alert('Failed to send password reset email');
      });
    } else {
      alert('Please enter your email address.');
    }
  }
}