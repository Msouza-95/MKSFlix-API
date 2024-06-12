import { ICreateDirectorDto } from '../dto/create-director.dto';
import { Director } from '../infra/typeorm/entities/director.entity';

export default interface IDirectorRepository {
  create(data: ICreateDirectorDto): Promise<Director>;
  show(): Promise<Director[]>;
  findById(director_id: string): Promise<Director | null>;
  findByName(name: string): Promise<Director | null>;
}
