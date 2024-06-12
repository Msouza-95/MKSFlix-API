import { ICreateCastDto } from 'src/module/cast/dto/create-cast.dto';
import ICastRepository from 'src/module/cast/repositories/I-cast-repository';
import { DataSource, DeleteResult, Repository } from 'typeorm';

import { Inject } from '@nestjs/common';

import { Cast } from '../entities/cast.entity';

export class CastRepository implements ICastRepository {
  private ormRepository: Repository<Cast>;

  constructor(@Inject('DATA_SOURCE') private dataSource: DataSource) {
    this.ormRepository = this.dataSource.getRepository(Cast);
  }

  public async create(data: ICreateCastDto): Promise<Cast> {
    const cast = this.ormRepository.create(data);

    await this.ormRepository.save(cast);

    return cast;
  }
  public async show(): Promise<Cast[]> {
    const cast = await this.ormRepository.find();

    return cast;
  }
  public async findById(id: string): Promise<Cast | null> {
    const cast = await this.ormRepository.findOne({
      where: {
        id,
      },
    });

    return cast;
  }

  public async save(data: Cast): Promise<Cast> {
    const cast = this.ormRepository.create(data);
    await this.ormRepository.save(cast);

    return cast;
  }
  public async delete(id: string): Promise<DeleteResult> {
    const result = await this.ormRepository.delete({ id });

    return result;
  }
}
