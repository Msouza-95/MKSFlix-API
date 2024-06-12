import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { Actor } from '../infra/typeorm/entities/actor.entity';
import IActorRepository from '../repositories/I-actor-repository';

interface IRequest {
  actor_id: string;
  name: string;
}

@Injectable()
export class UpdateActorUseCase {
  constructor(
    @Inject('IActorRepository')
    private actorRepositoy: IActorRepository,
  ) {}
  async execute({ actor_id, name }: IRequest): Promise<Actor> {
    const actor = await this.actorRepositoy.findById(actor_id);

    if (!actor) {
      throw new NotFoundException(`Actor d'not found`);
    }

    actor.name = name;

    const result = await this.actorRepositoy.save(actor);

    return result;
  }
}
