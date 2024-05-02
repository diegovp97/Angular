import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Firestore, collection, collectionData, query, where } from '@angular/fire/firestore';
import { Auth, user } from '@angular/fire/auth';
import { Observable, forkJoin, from, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { UserData } from '../../userdata/userdata';
import { AuthService } from '../../guards/auth';

@Component({
  selector: 'app-sdata',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './sdata.component.html',
  styleUrls: ['./sdata.component.css']
})
export class SdataComponent implements OnInit {
  data$: Observable<UserData[]> = of([]);
  private firestore: Firestore = inject(Firestore);
  private auth: Auth = inject(Auth);

  constructor(public authService: AuthService, private router:Router) {}

  ngOnInit(): void {
    user(this.auth).subscribe(currentUser => {
      if (currentUser) {
        const dataRef = collection(this.firestore, 'data');
        const dataQuery = query(dataRef, where('userId', '==', currentUser.uid));
        this.data$ = collectionData(dataQuery, { idField: 'id' }) as Observable<UserData[]>;
      }
    });
  }

  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['login']);
    }).catch(error => {
      console.error('Error during logout:', error);
    });
  }
}
