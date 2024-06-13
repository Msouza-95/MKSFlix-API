import { DeleteResult } from 'typeorm';

import { Inject, Injectable } from '@nestjs/common';

import IReviewRepository from '../repositories/I-review-repository';

@Injectable()
export class DeleteReviewUseCase {
  constructor(
    @Inject('IReviewRepository')
    private reviewRepository: IReviewRepository,
  ) {}
  async execute(review_id: string): Promise<DeleteResult> {
    const result = await this.reviewRepository.delete(review_id);

    return result;
  }
}
