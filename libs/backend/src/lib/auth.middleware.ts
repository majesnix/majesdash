import { IUserWithToken } from '@majesdash/data';
import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { ConfigService } from '@nestjs/config';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { UserService } from './user/user.service';

export interface CustomRequest extends Request {
  user?: IUserWithToken;
  loggedIn: boolean;
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const decoded: any = jwt.verify(
        token,
        this.configService.get<string>('SECRET')
      );
      const user = await this.userService.findById(decoded.id);

      if (!user) {
        throw new HttpException('User not found.', HttpStatus.UNAUTHORIZED);
      }

      req.loggedIn = true;
      req.user = user;
      next();
    } else {
      throw new HttpException('Not authorized.', HttpStatus.UNAUTHORIZED);
    }
  }
}
