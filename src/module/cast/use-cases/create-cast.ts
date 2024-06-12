import IActorRepository from 'src/module/actor/repositories/I-actor-repository';
import IMovieRepository from 'src/module/movie/repositories/I-movie-repository';

import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { ICreateCastDto } from '../dto/create-cast.dto';
import ICastRepository from '../repositories/I-cast-repository';

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
  async execute({ role, actor_id, movie_id }: ICreateCastDto): Promise<Cast> {
    const actor = await this.actorRepository.findById(actor_id);

    if (actor) {
      throw new NotFoundException(`The actor d'not exist`);
    }

    const movie = await this.movieRepository.findById(movie_id);

    if (movie) {
      throw new NotFoundException(`The movie d'not exist`);
    }

    const newcast = await this.castRepository.create({
      role,
      actor_id,
      movie_id,
    });

    return newcast;
  }
}
