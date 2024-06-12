import { DeleteResult } from 'typeorm';

import { Inject, Injectable } from '@nestjs/common';

import IActorRepository from '../repositories/I-actor-repository';

@Injectable()
export class DeleteActorUseCase {
  constructor(
    @Inject('IActorRepository')
    private actorRepositoy: IActorRepository,
  ) {}
  async execute(actor_id: string): Promise<DeleteResult> {
    const result = await this.actorRepositoy.delete(actor_id);

    return result;
  }
}
