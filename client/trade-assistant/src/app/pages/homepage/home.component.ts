import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { HomepageService } from '../../services/homepage.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  newsList: any[] = [];
  newsByCategory: { [key: string]: any[] } = {};
  newsByAuthor: { [key: string]: any[] } = {};
  newsByMonthYear: { [key: string]: any[] } = {};
  message = '';

  constructor(private homepageService: HomepageService) {}

  ngOnInit() {
    this.loadNews();
  }

  loadNews() {
    this.homepageService.getAllNews().subscribe({
      next: (res) => {
        this.newsList = res;
        this.newsByCategory = this.homepageService.groupByCategory(this.newsList);
        this.newsByAuthor = this.homepageService.groupByAuthor(this.newsList);
        this.newsByMonthYear = this.homepageService.groupByMonthYear(this.newsList);
      },
      error: () => this.message = '❌ Грешка при вчитување на вести'
    });
  }
}
