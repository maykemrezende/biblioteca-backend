import { Author } from "src/authors/entities/author.entity"
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"

@Entity()
export class Book {

    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    titulo!: string

    @Column()
    editora!: string

    @Column()
    foto!: string

    @ManyToOne(() => Author, (author) => author.books)
    author!:Author

}
