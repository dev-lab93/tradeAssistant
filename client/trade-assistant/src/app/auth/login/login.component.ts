import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [CommonModule, FormsModule, RouterModule]
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  message = '';

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    if (this.auth.isLoggedIn()) {
      // Ако е најавен, врати се на претходната страна
      this.router.navigateByUrl(document.referrer || '/dashboard');
    }
  }

  onSubmit() {
    this.auth.login({ email: this.email, password: this.password }).subscribe({
      next: (res) => {
        this.auth.saveToken(res.access_token);
        this.message = '✅ Успешна најава!';
        this.router.navigate(['/dashboard']); // по успешна најава, default на dashboard
      },
      error: () => {
        this.message = '❌ Неточни податоци.';
      },
    });
  }
}
