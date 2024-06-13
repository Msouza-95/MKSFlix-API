import { Cast } from 'src/module/cast/infra/typeorm/entities/cast.entity';
import ICastRepository from 'src/module/cast/repositories/I-cast-repository';

import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import IMovieRepository from '../repositories/I-movie-repository';

interface IRequest {
  movie_id: string;
}

@Injectable()
export class FindCastMovieUseCase {
  constructor(
    @Inject('IMovieRepository')
    private movieRepository: IMovieRepository,
    @Inject('ICastRepository')
    private castRepositoy: ICastRepository,
  ) {}
  async execute({ movie_id }: IRequest): Promise<Cast[]> {
    const movie = await this.movieRepository.findById(movie_id);
    if (!movie) {
      throw new NotFoundException("The movie d'not exist");
    }

    const casts = await this.castRepositoy.findByMovieId(movie_id);

    return casts;
  }
}
