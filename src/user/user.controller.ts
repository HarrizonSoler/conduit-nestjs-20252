import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Post, Put, UsePipes } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiParam, ApiProperty, ApiTags } from "@nestjs/swagger";
import { UserService } from "./user.service";
import { User } from "./user.decorator";
import { UserResponse } from "./user.interface";
import { CreateUserDto, LoginUserDto, UpdateUserDto } from "./dto";
import { ValidationPipe } from "src/shared/pipes/validation.pipe";

class LoginApiBody {
    @ApiProperty()
    user: LoginUserDto
}

class CreateApiBody {
    @ApiProperty()
    user: CreateUserDto
}

class UpdateApiBody {
    @ApiProperty()
    user: UpdateUserDto
}

@ApiBearerAuth()
@ApiTags('user')
@Controller()
export class UserController {
    constructor(private readonly service: UserService) {}

    @Get('user')
    async findByEmail(@User('email') email: string): Promise<UserResponse> {
        return this.service.findByEmail(email)
    }

    @Put('user')
    @ApiBody({ type: UpdateApiBody })
    async update(@User('id') userId: number, @Body('user') userData: UpdateUserDto) {
        return this.service.update(userId, userData);
    }

    @Post('user')
    @UsePipes(new ValidationPipe())
    @ApiBody({ type: CreateApiBody })
    async create(@Body('user') userData: CreateUserDto) {
        return this.service.create(userData);
    }

    @Delete('user/:email')
    @ApiParam({ name: "email", example: "user@mail.com" })
    async delete(@Param() email: string) {
        this.service.delete(email)
    }

    @UsePipes(new ValidationPipe())
    @Post('user/login')
    @ApiBody({ type: LoginApiBody })
    async login(@Body('user') loginDto: LoginUserDto): Promise<UserResponse> {
        const foundUser = await this.service.findOne(loginDto)

        if (!foundUser) {
            throw new HttpException({
                message: 'User not found',
            }, HttpStatus.UNAUTHORIZED)
        }

        const token = this.service.generateJWT(foundUser)

        const { email, username, bio, image } = foundUser
        const user = { email, username, bio, image, token }

        return { user }
    }
}