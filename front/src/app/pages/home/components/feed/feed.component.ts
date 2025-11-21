import { Component, OnInit } from '@angular/core';
import { articleMock } from '../../mocks/articleMock';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit {
  sortByLatest: boolean = true;
  constructor() {}
  article = articleMock;
  ngOnInit(): void {}

  onSortChange() {
    this.sortByLatest = !this.sortByLatest;
  }
}
