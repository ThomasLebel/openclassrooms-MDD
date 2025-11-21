import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/Article';
import { articleMock } from '../home/mocks/articleMock';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  article: Article = articleMock;

  constructor() {}

  ngOnInit(): void {}
}
