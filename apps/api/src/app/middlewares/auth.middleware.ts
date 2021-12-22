import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { NestMiddleware, HttpStatus, Injectable } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { UserService } from '../user/user.service';
import { UserData } from '../user/user.interface';
import { ConfigService } from '@nestjs/config';

export interface CustomRequest extends Request {
  user?: UserData;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService
  ) {}

  async use(req: CustomRequest, res: Response, next: NextFunction) {
    const authHeaders = req.headers.authorization;
    if (authHeaders && (authHeaders as string).split(' ')[1]) {
      const token = (authHeaders as string).split(' ')[1];
      const decoded: any = jwt.verify(token, this.configService.get<string>('SECRET'));
      const user = await this.userService.findById(decoded.id);

      if (!user) {
        throw new HttpException('User not found.', HttpStatus.UNAUTHORIZED);
      }

      req.user = user.user;
      next();
    } else {
      throw new HttpException('Not authorized.', HttpStatus.UNAUTHORIZED);
    }
  }
}
