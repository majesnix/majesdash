import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { ConfigService } from '@nestjs/config';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { SystemSettingsService } from './system-settings/system-settings.service';
import { UserData } from './user/user.interface';
import { UserService } from './user/user.service';

export interface CustomRequest extends Request {
  user?: UserData;
}

@Injectable()
export class AdminAuthMiddleware implements NestMiddleware {
  constructor(
    private readonly userService: UserService,
    private readonly systemSettingsService: SystemSettingsService,
    private readonly configService: ConfigService
  ) {}

  async use(req: CustomRequest, res: Response, next: NextFunction) {
    const authHeaders = req.headers.authorization;
    const systemSettings = await this.systemSettingsService.findOne();

    if (!systemSettings.initialized) {
      next();
    } else if (authHeaders && (authHeaders as string).split(' ')[1]) {
      const token = (authHeaders as string).split(' ')[1];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const decoded: any = jwt.verify(
        token,
        this.configService.get<string>('SECRET')
      );
      const { user } = await this.userService.findById(decoded.id);

      if (!user) {
        throw new HttpException('User not found.', HttpStatus.UNAUTHORIZED);
      }

      if (!user.isAdmin) {
        throw new HttpException('Not authorized.', HttpStatus.UNAUTHORIZED);
      }

      req.user = user;
      next();
    } else {
      throw new HttpException('Not authorized.', HttpStatus.UNAUTHORIZED);
    }
  }
}
