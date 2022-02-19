import {
  IUserResetPasswordAdminResponse,
  IUserWithToken,
} from '@majesdash/data';
import { HttpStatus, Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { validate } from 'class-validator';
import { randomBytes } from 'crypto';
import { unlink } from 'fs-extra';
import * as jwt from 'jsonwebtoken';
import { DeleteResult, getRepository, Repository } from 'typeorm';
import { SystemSettingsEntity } from '../system-settings/system-settings.entity';
import { UserSettingsEntity } from '../user-settings/user-settings.entity';
import {
  AdminUserUpdateDto,
  CreateUserDto,
  LoginUserDto,
  UpdateUserDto,
} from './dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(UserSettingsEntity)
    private readonly settingsRepository: Repository<UserSettingsEntity>,
    @InjectRepository(SystemSettingsEntity)
    private readonly systemSetingsRepository: Repository<SystemSettingsEntity>,
    private configService: ConfigService
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find({
      select: ['email', 'id', 'isAdmin', 'username'],
    });
  }

  async findOne({
    email,
    username,
    password,
  }: LoginUserDto): Promise<UserEntity | null> {
    let user: UserEntity;
    if (email) {
      user = await this.userRepository.findOne({ email });
    } else if (username) {
      user = await this.userRepository.findOne({ username });
    }

    if (!user) {
      return null;
    }

    if (await bcrypt.compare(password, user.passwordHash)) {
      return user;
    }

    return null;
  }

  async create(dto: CreateUserDto): Promise<IUserWithToken> {
    const systemSettings = await this.systemSetingsRepository.findOne();

    // check uniqueness of username/email
    const { username, email, password, passwordRepeat, isAdmin } = dto;
    const qb = getRepository(UserEntity)
      .createQueryBuilder('user')
      .where('user.username = :username', { username })
      .orWhere('user.email = :email', { email });

    const user = await qb.getOne();

    if (user) {
      const errors = { username: 'Username and email must be unique.' };
      throw new HttpException(
        { message: 'Input data validation failed', errors },
        HttpStatus.BAD_REQUEST
      );
    }

    if (password !== passwordRepeat) {
      const errors = { password: 'Passwords do not match.' };
      throw new HttpException(
        { message: 'Input data validation failed', errors },
        HttpStatus.BAD_REQUEST
      );
    }

    // create standard user settings
    const settings = await this.settingsRepository.save(
      new UserSettingsEntity()
    );

    // create new user
    const newUser = new UserEntity();
    newUser.username = username;
    newUser.email = email;
    newUser.passwordHash = password;
    newUser.isAdmin = systemSettings.initialized ? isAdmin : true;
    newUser.settings = settings;

    if (!systemSettings.initialized) {
      systemSettings.initialized = true;
      await this.systemSetingsRepository.save(systemSettings);
    }

    const errors = await validate(newUser);
    if (errors.length > 0) {
      const _errors = { username: 'Userinput is not valid.' };
      throw new HttpException(
        { message: 'Input data validation failed', _errors },
        HttpStatus.BAD_REQUEST
      );
    } else {
      const savedUser = await this.userRepository.save(newUser);

      return this.buildUserRO(savedUser);
    }
  }

  async update(
    id: number,
    dto: UpdateUserDto,
    avatar?: string
  ): Promise<UserEntity> {
    const user = await this.userRepository.findOne(id);

    if (!user)
      new HttpException({ message: 'User not found' }, HttpStatus.NOT_FOUND);

    if (avatar) {
      user.avatar = avatar;
    }
    if (dto.password && dto.passwordRepeat && dto.password === dto.password) {
      user.passwordHash = await bcrypt.hash(dto.password, 10);
    }

    return await this.userRepository.save(user);
  }

  async updateAsAdmin(dto: AdminUserUpdateDto): Promise<UserEntity> {
    const user = await this.userRepository.findOne(dto.id);

    if (!user)
      new HttpException({ message: 'User not found' }, HttpStatus.NOT_FOUND);

    if (dto.isAdmin) {
      user.isAdmin = dto.isAdmin;
    }

    if (dto.username) {
      user.username = dto.username;
    }

    if (dto.email) {
      user.email = dto.email;
    }

    return await this.userRepository.save(user);
  }

  async resetPassword(id: number): Promise<IUserResetPasswordAdminResponse> {
    const user = await this.userRepository.findOne(id);

    if (!user)
      new HttpException({ message: 'User not found' }, HttpStatus.NOT_FOUND);

    const tempPassword = randomBytes(21).toString('base64').slice(0, 21);

    user.passwordHash = await bcrypt.hash(tempPassword, 10);

    await this.userRepository.save(user);

    return {
      password: tempPassword,
    };
  }

  async deleteAvatar(id: number) {
    const user = await this.userRepository.findOne(id);

    if (!user)
      new HttpException({ message: 'User not found' }, HttpStatus.NOT_FOUND);

    await unlink(`./config/web/images/${user.id}/${user.avatar}`);
    user.avatar = null;

    await this.userRepository.save(user);

    return this.buildUserRO(user);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.userRepository.delete({ id: id });
  }

  async findById(id: number): Promise<IUserWithToken> {
    const user = await this.userRepository.findOne(id, {
      relations: ['settings'],
    });

    if (!user) {
      const errors = { User: ' not found' };
      throw new HttpException({ errors }, 401);
    }

    return this.buildUserRO(user);
  }

  async findByEmail(email: string): Promise<IUserWithToken> {
    const user = await this.userRepository.findOne({ email: email });
    if (!user) {
      const errors = { User: ' not found' };
      throw new HttpException({ errors }, 401);
    }
    return this.buildUserRO(user);
  }

  public generateJWT(user: UserEntity) {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign(
      {
        id: user.id,
        exp: exp.getTime() / 1000,
      },
      this.configService.get<string>('SECRET')
    );
  }

  private buildUserRO(user: UserEntity): IUserWithToken {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      token: this.generateJWT(user),
      avatar: user.avatar,
      isAdmin: user.isAdmin,
      settings: user.settings,
    };
  }
}
