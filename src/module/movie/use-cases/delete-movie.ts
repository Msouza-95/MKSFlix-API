import { DeleteResult } from 'typeorm';

import { Inject, Injectable } from '@nestjs/common';

import IMovieRepository from '../repositories/I-movie-repository';

interface IRequest {
  movie_id: string;
}

@Injectable()
export class DeleteMovieUseCase {
  constructor(
    @Inject('IMovieRepository')
    private movieRepositoy: IMovieRepository,
  ) {}
  async execute({ movie_id }: IRequest): Promise<DeleteResult> {
    const movies = await this.movieRepositoy.delete(movie_id);

    return movies;
  }
}
