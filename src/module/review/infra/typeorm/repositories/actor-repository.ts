import { ICreateReviewDto } from 'src/module/review/dto/create-review.dto';
import IReviewRepository from 'src/module/review/repositories/I-review-repository';
import { DataSource, DeleteResult, Repository } from 'typeorm';

import { Inject } from '@nestjs/common';

import { Review } from '../entities/review.entity';

export class ReviewRepository implements IReviewRepository {
  private ormRepository: Repository<Review>;

  constructor(@Inject('DATA_SOURCE') private dataSource: DataSource) {
    this.ormRepository = this.dataSource.getRepository(Review);
  }

  public async create(data: ICreateReviewDto): Promise<Review> {
    const review = this.ormRepository.create(data);

    await this.ormRepository.save(review);

    return review;
  }
  public async show(): Promise<Review[]> {
    const review = await this.ormRepository.find();

    return review;
  }
  public async findById(id: string): Promise<Review | null> {
    const review = await this.ormRepository.findOne({
      where: {
        id,
      },
    });

    return review;
  }

  public async save(data: Review): Promise<Review> {
    const review = this.ormRepository.create(data);
    await this.ormRepository.save(review);

    return review;
  }
  public async delete(id: string): Promise<DeleteResult> {
    const result = await this.ormRepository.delete({ id });

    return result;
  }
}
