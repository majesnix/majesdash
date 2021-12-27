import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository, DeleteResult } from 'typeorm';
import { UserEntity } from './user.entity';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from './dto';
import * as jwt from 'jsonwebtoken';
import { UserRO } from './user.interface';
import { validate } from 'class-validator';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { SettingsEntity } from '../settings/settings.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(SettingsEntity)
    private readonly settingsRepository: Repository<SettingsEntity>,
    private configService: ConfigService
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
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

  async create(dto: CreateUserDto): Promise<UserRO> {
    // check uniqueness of username/email
    const { username, email, password } = dto;
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

    // create new user
    const newUser = new UserEntity();
    newUser.username = username;
    newUser.email = email;
    newUser.passwordHash = password;
    newUser.isAdmin = false;

    const errors = await validate(newUser);
    if (errors.length > 0) {
      const _errors = { username: 'Userinput is not valid.' };
      throw new HttpException(
        { message: 'Input data validation failed', _errors },
        HttpStatus.BAD_REQUEST
      );
    } else {
      const savedUser = await this.userRepository.save(newUser);

      // create standard user settings
      const settings = new SettingsEntity();
      settings.user = savedUser;
      const savedSettings = await this.settingsRepository.save(settings);
      // add new settings to user
      savedUser.settings = savedSettings;
      await this.userRepository.save(savedUser);

      return this.buildUserRO(savedUser);
    }
  }

  async update(
    id: number,
    dto: UpdateUserDto,
    profilePic?: string
  ): Promise<UserEntity> {
    const user = await this.userRepository.findOne(id);

    if (!user)
      new HttpException({ message: 'User not found' }, HttpStatus.NOT_FOUND);

    if (profilePic) {
      user.image = profilePic;
    }
    if (dto.password && dto.passwordRepeat && dto.password === dto.password) {
      user.passwordHash = await bcrypt.hash(dto.password, 10);
    }

    await this.userRepository.save(user);

    if (user?.passwordHash) {
      delete user.passwordHash;
    }

    return user;
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.userRepository.delete({ id: id });
  }

  async findById(id: number): Promise<UserRO> {
    const user = await this.userRepository.findOne(id, {
      relations: ['settings'],
    });

    if (!user) {
      const errors = { User: ' not found' };
      throw new HttpException({ errors }, 401);
    }

    return this.buildUserRO(user);
  }

  async findByEmail(email: string): Promise<UserRO> {
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
        username: user.username,
        email: user.email,
        exp: exp.getTime() / 1000,
      },
      this.configService.get<string>('SECRET')
    );
  }

  private buildUserRO(user: UserEntity) {
    return {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        token: this.generateJWT(user),
        image: user.image,
        isAdmin: user.isAdmin,
        settings: user.settings,
      },
    };
  }
}
