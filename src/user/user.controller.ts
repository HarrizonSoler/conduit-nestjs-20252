import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Post, Put, UsePipes } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UserService } from "./user.service";
import { User } from "./user.decorator";
import { UserResponse } from "./user.interface";
import { CreateUserDto, LoginUserDto, UpdateUserDto } from "./dto";
import { ValidationPipe } from "src/shared/pipes/validation.pipe";

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
    async update(@User('id') userId: number, @Body('user') userData: UpdateUserDto) {
        return this.service.update(userId, userData);
    }

    @Post('user')
    @UsePipes(new ValidationPipe())
    async create(@Body('user') userData: CreateUserDto) {
        return this.service.create(userData);
    }

    @Delete('user/:email')
    async delete(@Param() email: string) {
        this.service.delete(email)
    }

    @UsePipes(new ValidationPipe())
    @Post('user/login')
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