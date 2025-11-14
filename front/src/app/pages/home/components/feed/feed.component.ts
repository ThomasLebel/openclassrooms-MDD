import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit {
  sortByLatest: boolean = true;
  constructor() {}

  ngOnInit(): void {}

  onSortChange() {
    this.sortByLatest = !this.sortByLatest;
  }
}
