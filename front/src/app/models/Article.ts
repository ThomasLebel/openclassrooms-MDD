import { Theme } from './Theme';

export interface Article {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
  theme: Theme;
}
