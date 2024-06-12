import { ICreateActorDto } from 'src/module/actor/dto/create-actor.dto';
import IActorRepository from 'src/module/actor/repositories/I-actor-repository';
import { DataSource, DeleteResult, Repository } from 'typeorm';

import { Inject } from '@nestjs/common';

import { Actor } from '../entities/actor.entity';

export class ActorRepository implements IActorRepository {
  private ormRepository: Repository<Actor>;

  constructor(@Inject('DATA_SOURCE') private dataSource: DataSource) {
    this.ormRepository = this.dataSource.getRepository(Actor);
  }

  public async create(data: ICreateActorDto): Promise<Actor> {
    const actor = this.ormRepository.create(data);

    await this.ormRepository.save(actor);

    return actor;
  }
  public async show(): Promise<Actor[]> {
    const actor = await this.ormRepository.find();

    return actor;
  }
  public async findById(id: string): Promise<Actor | null> {
    const actor = await this.ormRepository.findOne({
      where: {
        id,
      },
    });

    return actor;
  }

  public async findByName(name: string): Promise<Actor | null> {
    const actor = await this.ormRepository.findOne({
      where: {
        name,
      },
    });

    return actor;
  }

  public async save(data: Actor): Promise<Actor> {
    const actor = this.ormRepository.create(data);
    await this.ormRepository.save(actor);

    return actor;
  }
  public async delete(id: string): Promise<DeleteResult> {
    const result = await this.ormRepository.delete({ id });

    return result;
  }
}
