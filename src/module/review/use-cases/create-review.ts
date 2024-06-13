import IMovieRepository from 'src/module/movie/repositories/I-movie-repository';

import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Review } from '../infra/typeorm/entities/review.entity';
import IReviewRepository from '../repositories/I-review-repository';

interface IRquest {
  reviewer: string;
  rating: number;
  movie_id: string;
}

@Injectable()
export class CreateReviewUseCase {
  constructor(
    @Inject('IReviewRepository')
    private reviewRepositoy: IReviewRepository,
    @Inject('IMovieRepository')
    private movieRepositoy: IMovieRepository,
  ) {}
  async execute({ reviewer, rating, movie_id }: IRquest): Promise<Review> {
    const movie = await this.movieRepositoy.findById(movie_id);

    if (!movie) {
      throw new NotFoundException("The movie d'not found");
    }
    const newReview = await this.reviewRepositoy.create({
      rating,
      reviewer,
    });

    newReview.movie = movie;

    await this.reviewRepositoy.save(newReview);

    return newReview;
  }
}
