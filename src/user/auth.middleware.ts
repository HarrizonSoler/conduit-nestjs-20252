import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { UserService } from "./user.service";
import { NextFunction, Request, Response } from "express";
import { UserData } from "./user.interface";
import jwt from "jsonwebtoken"
import { SECRET } from "src/config";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private readonly service: UserService) { }

    async use(req: Request & { user?: UserData & { id?: number } }, res: Response, next: NextFunction) {
        const authHeaders = req.headers.authorization

        const token = (authHeaders as string).split(' ')[1]

        if (!authHeaders || !token) {
            throw new HttpException('Not authorized', HttpStatus.UNAUTHORIZED)
        }

        const decoded: any = this.verifyToken(token)
        const user = await this.service.findById(decoded.id)

        if (!user) {
            throw new HttpException('User not found', HttpStatus.UNAUTHORIZED)
        }

        req.user = user.user
        req.user.id = decoded.id
        next()
    }

    private verifyToken(token: string) {
        try {
            return jwt.verify(token, SECRET)
        } catch (error) {
            throw new HttpException('Not authorized token', HttpStatus.UNAUTHORIZED)
        }
    }
}