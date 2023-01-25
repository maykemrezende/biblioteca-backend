import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'src/books/entities/book.entity';
import { Repository } from 'typeorm';
import { AuthorDto } from './dto/author.dto';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Author } from './entities/author.entity';

@Injectable()
export class AuthorsService {

  /**
   *
   */
  constructor(
    @InjectRepository(Author)
    private authorRepository: Repository<Author>
  ) {
  }

  create(createAuthorDto: CreateAuthorDto): boolean {
    let author = new Author();
    author.nome = createAuthorDto.name;
    author.books = createAuthorDto.books.map(book => {
      let bookEntity = new Book();
      bookEntity.titulo = book.name;
      bookEntity.editora = book.publisher;

      return bookEntity;
    });

    let created = this.authorRepository.save(author);

    return created != null;
  }

  async findAll(): Promise<AuthorDto[]> {
    var authors = await this.authorRepository.find();

    return authors.map(author => {
      var authorReturn = new AuthorDto();
      authorReturn.name = author.nome

      return authorReturn;
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} author`;
  }

  update(id: number, updateAuthorDto: UpdateAuthorDto) {
    return `This action updates a #${id} author`;
  }

  remove(id: number) {
    return `This action removes a #${id} author`;
  }
}
