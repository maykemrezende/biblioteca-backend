import { ApiProperty } from "@nestjs/swagger";

export class CreateAuthorBooksDto{
    @ApiProperty()
    name!: string;
    @ApiProperty()
    publisher!: string;
}