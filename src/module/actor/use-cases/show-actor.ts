import { Inject, Injectable } from '@nestjs/common';

import { Actor } from '../infra/typeorm/entities/actor.entity';
import IActorRepository from '../repositories/I-actor-repository';

@Injectable()
export class ShowActorUseCase {
  constructor(
    @Inject('IActorRepository')
    private actorRepositoy: IActorRepository,
  ) {}
  async execute(): Promise<Actor[]> {
    const actor = await this.actorRepositoy.show();

    return actor;
  }
}
