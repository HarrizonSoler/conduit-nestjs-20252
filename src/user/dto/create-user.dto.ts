import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateUserDto {
    @ApiProperty({ example: "user" })
    @IsNotEmpty()
    readonly username!: string;

    @ApiProperty({ example: "user@mail.com" })
    @IsNotEmpty()
    readonly email!: string;

    @ApiProperty({ example: "1234" })
    @IsNotEmpty()
    readonly password!: string;
}