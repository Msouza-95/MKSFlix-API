import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { Cast } from '../infra/typeorm/entities/cast.entity';
import ICastRepository from '../repositories/I-cast-repository';

interface IRequest {
  actor_id: string;
  cast_id: string;
  movie_id: string;
  role: string;
}

@Injectable()
export class UpdateCastUseCase {
  constructor(
    @Inject('ICastRepository')
    private castRepositoy: ICastRepository,
  ) {}
  async execute({
    cast_id,
    role,
    movie_id,
    actor_id,
  }: IRequest): Promise<Cast> {
    const cast = await this.castRepositoy.findById(cast_id);

    if (!cast) {
      throw new NotFoundException(`Cast d'not found`);
    }

    cast.role = role;
    // cast.movie = movie_id;
    // cast.actor = actor_id;

    const result = await this.castRepositoy.save(cast);

    return result;
  }
}
