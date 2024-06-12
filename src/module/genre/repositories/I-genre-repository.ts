import { ICreateGenreDto } from '../dto/create-genre.dto';
import { Genre } from '../infra/typeorm/entities/genre.entity';

export default interface IGenreRepository {
  create(data: ICreateGenreDto): Promise<Genre>;
  show(): Promise<Genre[]>;
  findById(id: string): Promise<Genre | null>;
  findByName(name: string): Promise<Genre | null>;
}
