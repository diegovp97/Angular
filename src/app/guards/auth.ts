import { Injectable } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from '@angular/fire/auth';
import { Observable, map, take } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: Observable<any>;

  constructor(private auth: Auth, private router: Router) {
    this.user = authState(this.auth); 
  }
  register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }


  resetPassword(email: string) {
    return sendPasswordResetEmail(this.auth, email);
  }
  logout(): Promise<void> {
    return this.auth.signOut();
  }
}