import UserComment from './Comment';

export interface Article {
  id: number;
  title: string;
  content: string;
  authorUsername: string;
  themeTitle: string;
  comments?: UserComment[];
  createdAt: Date;
  updatedAt: Date;
}
