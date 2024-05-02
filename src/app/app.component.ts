import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './guards/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  title= 'test';
    
  constructor(private authService: AuthService, private router: Router) {}

ngOnInit() {
  this.authService.user.subscribe(user => {
    if (user) {
      this.router.navigate(['/data']);
    } else {
      this.router.navigate(['/gate']);
    }
  });
}
}
