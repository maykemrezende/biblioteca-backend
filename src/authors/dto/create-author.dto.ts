import { ApiProperty } from "@nestjs/swagger";
import { CreateAuthorBooksDto } from "./create-author-books.dto";

export class CreateAuthorDto {
    @ApiProperty()
    name!: string;
    @ApiProperty({
        type: [CreateAuthorBooksDto]
    })
    books!: CreateAuthorBooksDto[]; 
}
