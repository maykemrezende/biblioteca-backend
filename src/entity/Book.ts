import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { Author } from "./Author"

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
