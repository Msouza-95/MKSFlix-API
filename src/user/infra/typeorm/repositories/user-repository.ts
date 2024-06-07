import { ICreateUserDto } from 'src/user/dto/create-user.dto';
import IUserRepository from 'src/user/repositories/I-user-repository';
import { DataSource, Repository } from 'typeorm';

import { Inject } from '@nestjs/common';

import { User } from '../entities/user.entity';

export class UserRepositoy implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor(@Inject('DATA_SOURCE') private dataSource: DataSource) {
    this.ormRepository = this.dataSource.getRepository(User);
  }
  public async create(data: ICreateUserDto): Promise<User> {
    const user = this.ormRepository.create(data);

    await this.ormRepository.save(user);

    return user;
  }
  public async show(): Promise<User[]> {
    const users = await this.ormRepository.find();

    return users;
  }
  public async findById(user_id: string): Promise<User | null> {
    const user = this.ormRepository.findOne({
      where: {
        id: user_id,
      },
    });

    return user;
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = this.ormRepository.findOne({
      where: {
        email,
      },
    });

    return user;
  }
}
