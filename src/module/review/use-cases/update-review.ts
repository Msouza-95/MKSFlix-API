import IMovieRepository from 'src/module/movie/repositories/I-movie-repository';

import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { Review } from '../infra/typeorm/entities/review.entity';
import IReviewRepository from '../repositories/I-review-repository';

interface IRequest {
  movie_id: string;
  rating: number;
  reviewer: string;
  review_id;
}

@Injectable()
export class UpdateReviewUseCase {
  constructor(
    @Inject('IReviewRepository')
    private reviewRepositoy: IReviewRepository,
    @Inject('IMovieRepository')
    private movieRepositoy: IMovieRepository,
  ) {}
  async execute({
    movie_id,
    rating,
    reviewer,
    review_id,
  }: IRequest): Promise<Review> {
    const review = await this.reviewRepositoy.findById(review_id);

    if (!review) {
      throw new NotFoundException(`Review d'not found`);
    }

    const movie = await this.movieRepositoy.findById(movie_id);

    if (!movie) {
      throw new NotFoundException(`Movie d'not found`);
    }

    review.movie = movie;
    review.rating = rating;
    review.reviewer = reviewer;

    const result = await this.reviewRepositoy.save(review);

    return result;
  }
}
