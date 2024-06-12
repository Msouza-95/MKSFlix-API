import { ICreateMovieDto } from '../dto/create-movie.dto';
import { Movie } from '../infra/typeorm/entities/movie.entity';

export default interface IMovieRepository {
  create(data: ICreateMovieDto): Promise<Movie>;
  show(): Promise<Movie[]>;
  findById(movie_id: string): Promise<Movie | null>;
  findByTitle(title: string): Promise<Movie | null>;
}
