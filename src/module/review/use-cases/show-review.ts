import { Inject, Injectable } from '@nestjs/common';

import { Review } from '../infra/typeorm/entities/review.entity';
import IReviewRepository from '../repositories/I-review-repository';

@Injectable()
export class ShowReviewUseCase {
  constructor(
    @Inject('IReviewRepository')
    private reviewRepositoy: IReviewRepository,
  ) {}
  async execute(): Promise<Review[]> {
    const review = await this.reviewRepositoy.show();

    return review;
  }
}
