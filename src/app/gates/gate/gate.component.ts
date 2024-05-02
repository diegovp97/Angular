import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../guards/auth';
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-gate',
  standalone: true,
  imports: [],
  templateUrl: './gate.component.html',
  styleUrl: './gate.component.css'
})
export class GateComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.user.pipe(take(1)).subscribe(user => {
      if (user) {
        this.router.navigate(['/data']);
      } else {
        this.router.navigate(['/login']);
      }
    });
  }
}