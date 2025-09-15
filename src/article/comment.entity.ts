import { ManyToOne, PrimaryKey, Property } from "@mikro-orm/sqlite";
import { User } from "src/user/user.entity";
import { Article } from "./article.entity";

export class Comment {
  @PrimaryKey()
  id!: number

  @Property()
  createdAt = new Date()

  @Property({ onUpdate: () => new Date()})
  updatedAt = new Date()

  @Property()
  body: string;

  @ManyToOne()
  article: Article;

  @ManyToOne()
  author: User;

  constructor(author: User, article: Article, body: string) {
    this.author = author;
    this.article = article;
    this.body = body;
  }
}
