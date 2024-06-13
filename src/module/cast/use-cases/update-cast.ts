import IActorRepository from 'src/module/actor/repositories/I-actor-repository';
import IMovieRepository from 'src/module/movie/repositories/I-movie-repository';

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
    @Inject('IActorRepository')
    private actorRepositoy: IActorRepository,
    @Inject('IMovieRepository')
    private movieRepositoy: IMovieRepository,
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

    const actor = await this.actorRepositoy.findById(actor_id);

    if (!actor) {
      throw new NotFoundException(`Actor d'not found`);
    }

    const movie = await this.movieRepositoy.findById(movie_id);

    if (!movie) {
      throw new NotFoundException(`Movie d'not found`);
    }

    cast.role = role;
    cast.actor = actor;
    cast.movie = movie; // cast.movie = movie_id;
    // cast.actor = actor_id;

    const result = await this.castRepositoy.save(cast);

    return result;
  }
}
