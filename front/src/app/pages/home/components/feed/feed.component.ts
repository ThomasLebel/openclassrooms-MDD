import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../../services/article.service';
import { Article } from '../../../../models/Article';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit {
  sortByLatest: boolean = true;
  articles: Article[] = [];
  constructor(
    private articleService: ArticleService,
    private snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.getAllSubscribedArticle();
  }

  onSortChange() {
    this.sortByLatest = !this.sortByLatest;
    this.sortArticles();
  }

  getAllSubscribedArticle() {
    this.articleService.getSubscribedArticles().subscribe({
      next: (response) => {
        this.articles = response;
        this.sortArticles();
      },
      error: (err) =>
        this.snackBar.open(
          'Une erreur est survenue lors de la récupération des articles',
          'Fermer',
          { duration: 3000 }
        ),
    });
  }

  sortArticles() {
    this.articles.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return this.sortByLatest ? dateB - dateA : dateA - dateB;
    });
  }
}
