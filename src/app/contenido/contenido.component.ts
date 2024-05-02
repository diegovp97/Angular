import { Component, OnInit, OnDestroy, ViewChild, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../guards/auth';
import { User } from '@angular/fire/auth';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Firestore } from '@angular/fire/firestore';
import { addDoc, collection } from 'firebase/firestore';

@Component({
  selector: 'app-contenido',
  standalone: true,
  imports: [CommonModule, NgFor, FormsModule],
  templateUrl: './contenido.component.html',
  styleUrls: ['./contenido.component.css']
})
export class ContenidoComponent implements OnInit, OnDestroy {

  @ViewChild("createQuestionnaireform") QuestionnaireForm: any;
  firestore:Firestore = inject(Firestore);

  saveData(): void {
    addDoc(collection(this.firestore, "questionnaires"), {
      color: this.QuestionnaireForm.value.color,
      animal: this.QuestionnaireForm.value.animal,
      comida: this.QuestionnaireForm.value.comida
    });
  }

  private userSubscription: Subscription = new Subscription();
  userName: string = '';

  Quizzes: any[] = [];
  selectedAnswers: { [key: string]: { [key: string]: string } } = {};

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.userSubscription = this.authService.user.subscribe((user: User | null) => {
     
      this.userName = user ? user.displayName || 'Usuario' : '';
    });
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }


  submitForm(): void {
    let resultado = `Has seleccionado estas opciones:\n`;
    resultado += `Color: ${this.QuestionnaireForm.value.color}\n`;
    resultado += `Animal: ${this.QuestionnaireForm.value.animal}\n`;
    resultado += `Comida: ${this.QuestionnaireForm.value.comida}\n`;
    resultado += `¡Gracias por participar!`;
    alert(resultado);
    this.saveData();
  }
}
