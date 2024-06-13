import { CreateReviewUseCase } from 'src/module/review/use-cases/create-review';
import { DeleteReviewUseCase } from 'src/module/review/use-cases/delete-review';
import { ShowReviewUseCase } from 'src/module/review/use-cases/show-review';
import { UpdateReviewUseCase } from 'src/module/review/use-cases/update-review';
import { ZodValidationPipe } from 'src/pipes/zod-validation.-pipe';
import { z } from 'zod';

import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Delete,
  Param,
  UsePipes,
} from '@nestjs/common';

const updateReviewBody = z.object({
  reviewer: z.string(),
  rating: z.number(),
  movie_id: z.string().uuid(),
  review_id: z.string().uuid(),
});

const createRevieWBody = z.object({
  reviewer: z.string(),
  rating: z.number(),
  movie_id: z.string().uuid(),
});

type CreateRevieWBody = z.infer<typeof createRevieWBody>;
type UpdateReviewBody = z.infer<typeof updateReviewBody>;

@Controller('reviews')
export class ReviewController {
  constructor(
    private readonly createReviewUseCase: CreateReviewUseCase,
    private readonly showReviewUseCase: ShowReviewUseCase,
    private readonly deleteReviewUseCase: DeleteReviewUseCase,
    private readonly updateReviewUseCase: UpdateReviewUseCase,
  ) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createRevieWBody))
  create(@Body() createRevieWBody: CreateRevieWBody) {
    return this.createReviewUseCase.execute(createRevieWBody);
  }
  @Get()
  findAll() {
    return this.showReviewUseCase.execute();
  }
  @Put()
  @UsePipes(new ZodValidationPipe(updateReviewBody))
  update(@Body() updateReviewBody: UpdateReviewBody) {
    return this.updateReviewUseCase.execute(updateReviewBody);
  }
  @Delete(':review_id')
  delete(@Param('review_id') review_id: string) {
    return this.deleteReviewUseCase.execute(review_id);
  }
}
