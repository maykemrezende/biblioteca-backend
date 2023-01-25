import { Book } from "src/books/entities/book.entity"
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"

@Entity()
export class Author {

    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    nome!: string

    @OneToMany(() => Book, (book) => book.author)
    books!: Book[]
}
