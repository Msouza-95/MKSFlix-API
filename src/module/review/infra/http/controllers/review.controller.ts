import { ICreateActorDto } from 'src/module/actor/dto/create-actor.dto';
import { CreateActorUseCase } from 'src/module/actor/use-cases/create-actor';
import { DeleteActorUseCase } from 'src/module/actor/use-cases/delete-actor';
import { ShowActorUseCase } from 'src/module/actor/use-cases/show-actor';
import { UpdateActorUseCase } from 'src/module/actor/use-cases/update-actor';
import { ICreateReviewDto } from 'src/module/review/dto/create-review.dto';
import { CreateReviewUseCase } from 'src/module/review/use-cases/create-review';
import { DeleteReviewUseCase } from 'src/module/review/use-cases/delete-review';
import { ShowReviewUseCase } from 'src/module/review/use-cases/show-review';
import { UpdateReviewUseCase } from 'src/module/review/use-cases/update-review';

import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Delete,
  Param,
} from '@nestjs/common';

interface IUpdateReviewBody {
  reviewer: string;
  rating: number;
  movie_id: string;
  review_id: string;
}

interface ICreateRevieWBody {
  reviewer: string;
  rating: number;
  movie_id: string;
}

@Controller('reviews')
export class ReviewController {
  constructor(
    private readonly createReviewUseCase: CreateReviewUseCase,
    private readonly showReviewUseCase: ShowReviewUseCase,
    private readonly deleteReviewUseCase: DeleteReviewUseCase,
    private readonly updateReviewUseCase: UpdateReviewUseCase,
  ) {}

  @Post()
  create(@Body() createRevieWBody: ICreateRevieWBody) {
    return this.createReviewUseCase.execute(createRevieWBody);
  }
  @Get()
  findAll() {
    return this.showReviewUseCase.execute();
  }
  @Put()
  update(@Body() updateReviewBody: IUpdateReviewBody) {
    return this.updateReviewUseCase.execute(updateReviewBody);
  }
  @Delete(':review_id')
  delete(@Param('review_id') review_id: string) {
    return this.deleteReviewUseCase.execute(review_id);
  }
}
