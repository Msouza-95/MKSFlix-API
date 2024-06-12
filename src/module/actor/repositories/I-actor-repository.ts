import { DeleteResult } from 'typeorm';

import { ICreateActorDto } from '../dto/create-actor.dto';
import { Actor } from '../infra/typeorm/entities/actor.entity';

export default interface IActorRepository {
  create(data: ICreateActorDto): Promise<Actor>;
  show(): Promise<Actor[]>;
  findById(id: string): Promise<Actor | null>;
  findByName(name: string): Promise<Actor | null>;
  save(data: Actor): Promise<Actor>;
  delete(id: string): Promise<DeleteResult>;
}
