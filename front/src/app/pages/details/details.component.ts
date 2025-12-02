import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/Article';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '../services/article.service';
import { CommentService } from '../services/comment.service';
import CommentCreateRequest from '../../core/interfaces/requests/commentCreateRequest.interface';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  articleID: string | null = null;
  article!: Article;
  commentText = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private commentService: CommentService
  ) {}

  ngOnInit(): void {
    this.articleID = this.route.snapshot.paramMap.get('id');
    if (this.articleID) {
      this.getArticleById(this.articleID);
    }
  }

  getArticleById(id: string) {
    this.articleService.getArticleById(id).subscribe({
      next: (response) => {
        this.article = response;
      },
      error: (err) => {
        this.router.navigate(['']);
      },
    });
  }

  onSubmitComment() {
    if (this.articleID && this.commentText) {
      const commentCreateRequest: CommentCreateRequest = {
        articleId: parseInt(this.articleID),
        content: this.commentText,
      };
      this.commentService.create(commentCreateRequest).subscribe({
        next: (response) => {
          this.commentText = '';
          this.article.comments?.push(response);
        },
        error: (err) => {
          console.log('erreur');
        },
      });
    }
  }
}
