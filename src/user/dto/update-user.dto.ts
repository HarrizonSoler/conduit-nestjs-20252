import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserDto {
    @ApiProperty({ example: "lorem ipsum" })
    readonly bio!: string;

    @ApiProperty({ example: "user@mail.com" })
    readonly email!: string;

    @ApiProperty({ example: "https://static.productionready.io/images/smiley-cyrus.jpg" })
    readonly image!: string;

    @ApiProperty({ example: "user" })
    readonly username!: string;
}