import { hash } from 'bcryptjs';
import { z } from 'zod';

import { ConflictException, Inject, Injectable } from '@nestjs/common';

import { ICreateUserDto } from '../dto/create-user.dto';
import { User } from '../infra/typeorm/entities/user.entity';
import IUserRepository from '../repositories/I-user-repository';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('IUserRepository')
    private userRepositoy: IUserRepository,
  ) {}
  async execute({ name, email, password }: ICreateUserDto): Promise<User> {
    const user = await this.userRepositoy.findByEmail(email);

    if (user) {
      throw new ConflictException('The user already exist ');
    }

    const hashPassword = await hash(password, 8);

    const newUser = await this.userRepositoy.create({
      name,
      email,
      password: hashPassword,
    });

    return newUser;
  }
}
