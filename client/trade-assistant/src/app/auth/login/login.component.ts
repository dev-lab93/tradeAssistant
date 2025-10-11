import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class LoginComponent {
  email = '';
  password = '';
  message = '';

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
  this.auth.login({ email: this.email, password: this.password }).subscribe({
    next: (res) => {
      this.auth.saveToken(res.access_token);
      this.message = '✅ Успешна најава!';
      if (this.auth.isLoggedIn()) {
        this.router.navigate(['/dashboard']);
      }
    },
    error: () => {
      this.message = '❌ Неточни податоци.';
    },
  });
}

}
