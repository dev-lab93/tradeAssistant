import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { RoutesService } from '../../services/routes.service';

@Component({
  selector: 'app-article-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.scss']
})
export class ArticleDetailsComponent implements OnInit {
  news: any;
  message = '';

  constructor(
    private route: ActivatedRoute,
    private routesService: RoutesService
  ) {}

  ngOnInit() {
  const id = this.route.snapshot.paramMap.get('id');
  if (id) {
    this.routesService.getOne('news', +id).subscribe({
      next: (res) => this.news = res,
      error: () => this.message = '❌ Грешка при вчитување на веста'
    });
  }
}

}
