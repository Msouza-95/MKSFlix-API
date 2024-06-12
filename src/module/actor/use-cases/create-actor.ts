import { ConflictException, Inject, Injectable } from '@nestjs/common';

import { ICreateActorDto } from '../dto/create-actor.dto';
import { Actor } from '../infra/typeorm/entities/actor.entity';
import IActorRepository from '../repositories/I-actor-repository';

@Injectable()
export class CreateActorUseCase {
  constructor(
    @Inject('IActorRepository')
    private actorRepositoy: IActorRepository,
  ) {}
  async execute({ name }: ICreateActorDto): Promise<Actor> {
    const actor = await this.actorRepositoy.findByName(name);

    if (actor) {
      throw new ConflictException('The actor already exist ');
    }

    const newActor = await this.actorRepositoy.create({
      name,
    });

    return newActor;
  }
}
