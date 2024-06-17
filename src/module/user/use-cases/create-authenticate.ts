import { compare } from 'bcryptjs';

import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import IUserRepository from '../repositories/I-user-repository';

interface IRequest {
  email: string;
  password: string;
}

@Injectable()
export class CreateauthenticateUseCase {
  constructor(
    @Inject('IUserRepository')
    private userRepository: IUserRepository,
    private readonly jwt: JwtService,
  ) {}
  async execute({ email, password }: IRequest): Promise<string> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('User credentials do not match');
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('User credentials do not match');
    }
    const accessToken = this.jwt.sign({ sub: user.id });

    return accessToken;
  }
}
