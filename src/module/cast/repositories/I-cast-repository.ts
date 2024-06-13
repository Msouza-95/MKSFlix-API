import { DeleteResult } from 'typeorm';

import { ICreateCastDto } from '../dto/create-cast.dto';
import { Cast } from '../infra/typeorm/entities/cast.entity';

export default interface ICastRepository {
  create(data: ICreateCastDto): Promise<Cast>;
  show(): Promise<Cast[]>;
  findById(id: string): Promise<Cast | null>;
  save(data: Cast): Promise<Cast>;
  delete(id: string): Promise<DeleteResult>;
  findByMovieId(movie_id: string): Promise<Cast[]>;
}
