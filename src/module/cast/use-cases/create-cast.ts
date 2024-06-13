import IActorRepository from 'src/module/actor/repositories/I-actor-repository';
import IMovieRepository from 'src/module/movie/repositories/I-movie-repository';

import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { Cast } from '../infra/typeorm/entities/cast.entity';
import ICastRepository from '../repositories/I-cast-repository';

interface IRequest {
  role: string;
  actor_id: string;
  movie_id: string;
}

@Injectable()
export class CreateCastUseCase {
  constructor(
    @Inject('ICastRepository')
    private castRepository: ICastRepository,
    @Inject('IActorRepository')
    private actorRepository: IActorRepository,
    @Inject('IMovieRepository')
    private movieRepository: IMovieRepository,
  ) {}
  async execute({ role, actor_id, movie_id }: IRequest): Promise<Cast> {
    const actor = await this.actorRepository.findById(actor_id);

    if (!actor) {
      throw new NotFoundException(`The actor d'not exist`);
    }

    const movie = await this.movieRepository.findById(movie_id);

    if (!movie) {
      throw new NotFoundException(`The movie d'not exist`);
    }

    const newcast = await this.castRepository.create({
      role,
    });

    newcast.movie = movie;
    newcast.actor = actor;

    return newcast;
  }
}
