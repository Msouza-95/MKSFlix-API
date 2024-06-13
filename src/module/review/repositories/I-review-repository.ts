import { DeleteResult } from 'typeorm';

import { ICreateReviewDto } from '../dto/create-review.dto';
import { Review } from '../infra/typeorm/entities/review.entity';

export default interface IReviewRepository {
  create(data: ICreateReviewDto): Promise<Review>;
  show(): Promise<Review[]>;
  findById(id: string): Promise<Review | null>;
  save(data: Review): Promise<Review>;
  delete(id: string): Promise<DeleteResult>;
}
