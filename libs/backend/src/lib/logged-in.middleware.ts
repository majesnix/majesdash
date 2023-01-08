import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { UserService } from './user/user.service';

export interface CustomRequest extends Request {
  loggedIn: boolean;
}

@Injectable()
export class LoggedInMiddleware implements NestMiddleware {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService
  ) {}

  async use(req: CustomRequest, res: Response, next: NextFunction) {
    const authHeaders = req.headers.authorization;
    if (authHeaders && (authHeaders as string).split(' ')[1]) {
      const token = (authHeaders as string).split(' ')[1];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      jwt.verify(token, this.configService.get<string>('SECRET'));

      req.loggedIn = true;
      next();
    } else {
      req.loggedIn = false;
      next();
    }
  }
}
