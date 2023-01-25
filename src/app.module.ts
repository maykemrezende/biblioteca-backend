import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorsModule } from './authors/authors.module';
import { Author } from './authors/entities/author.entity';
import { HealthModule } from './health/health.module';
import { BooksModule } from './books/books.module';
import { Book } from './books/entities/book.entity';

@Module({
  imports: [HealthModule, AuthorsModule, TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'books-mngmnt',
    autoLoadEntities: true,
    synchronize: true, //never true in prod
  }), BooksModule],
})
export class AppModule {}
