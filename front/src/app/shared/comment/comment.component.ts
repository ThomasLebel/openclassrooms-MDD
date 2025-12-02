import { Component, Input, OnInit } from '@angular/core';
import UserComment from '../../models/Comment';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  @Input() comment!: UserComment;
  constructor() {}

  ngOnInit(): void {}
}
