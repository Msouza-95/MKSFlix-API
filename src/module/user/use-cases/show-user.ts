import { Inject, Injectable } from '@nestjs/common';

import { User } from '../infra/typeorm/entities/user.entity';
import IUserRepository from '../repositories/I-user-repository';

@Injectable()
export class ShowUserUseCase {
  constructor(
    @Inject('IUserRepository')
    private userRepositoy: IUserRepository,
  ) {}
  async execute(): Promise<User[]> {
    const users = await this.userRepositoy.show();

    return users;
  }
}
