import IDirectorRepository from 'src/module/director/repositories/I-director-repository';
import { ICreateUserDto } from 'src/module/user/dto/create-user.dto';
import { DataSource, Repository } from 'typeorm';

import { Inject } from '@nestjs/common';

import { Director } from '../entities/director.entity';

export class DirectorRepository implements IDirectorRepository {
  private ormRepository: Repository<Director>;

  constructor(@Inject('DATA_SOURCE') private dataSource: DataSource) {
    this.ormRepository = this.dataSource.getRepository(Director);
  }
  public async create(data: ICreateUserDto): Promise<Director> {
    const user = this.ormRepository.create(data);

    await this.ormRepository.save(user);

    return user;
  }
  public async show(): Promise<Director[]> {
    const users = await this.ormRepository.find();

    return users;
  }
  public async findById(director_id: string): Promise<Director | null> {
    const user = this.ormRepository.findOne({
      where: {
        id: director_id,
      },
    });

    return user;
  }

  public async findByName(name: string): Promise<Director | null> {
    const user = this.ormRepository.findOne({
      where: {
        name,
      },
    });

    return user;
  }
}
