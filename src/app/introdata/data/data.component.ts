import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { Auth, user } from '@angular/fire/auth';
import  {take} from 'rxjs';

@Component({
  selector: 'app-data',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './data.component.html',
  styleUrl: './data.component.css'
})
export class DataComponent {
  private firestore: Firestore = inject(Firestore);
  private auth: Auth = inject(Auth);

  constructor(private router: Router) {}

  async onSubmit(data: any) {
    const currentUser = await user(this.auth).pipe(take(1)).toPromise(); 
    if (!currentUser) {
      alert('No user logged in');
      return;
    }

    try {
      
      const docRef = await addDoc(collection(this.firestore, 'data'), {
        ...data,
        userId: currentUser.uid  
      });
      console.log('Document written with ID:', docRef.id);
      this.router.navigate(['/sdata']); 
    } catch (e) {
      console.error('Error adding document: ', e);
      alert('Failed to add data');
    }
  }
}