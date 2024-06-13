import { DbModule } from 'src/db/db.module';

import { Module } from '@nestjs/common';

import { MovieModule } from '../movie/movie.module';
import { ReviewController } from './infra/http/controllers/review.controller';
import { ReviewRepository } from './infra/typeorm/repositories';
import { reviewProviders } from './review.providers';
import { CreateReviewUseCase } from './use-cases/create-review';
import { DeleteReviewUseCase } from './use-cases/delete-review';
import { ShowReviewUseCase } from './use-cases/show-review';
import { UpdateReviewUseCase } from './use-cases/update-review';

@Module({
  imports: [DbModule, MovieModule],
  controllers: [ReviewController],

  providers: [
    {
      provide: 'IReviewRepository',
      useClass: ReviewRepository,
    },
    ...reviewProviders,
    ShowReviewUseCase,
    CreateReviewUseCase,
    UpdateReviewUseCase,
    DeleteReviewUseCase,
  ],
  exports: [
    {
      provide: 'IReviewRepository',
      useClass: ReviewRepository,
    },
  ],
})
export class ReviewModule {}
