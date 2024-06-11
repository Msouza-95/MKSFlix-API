import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { uuid } from 'uuidv4';

@Entity('movie')
export class Movie {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title!: string;

  @Column()
  releaseYear!: number;

  @Column()
  director_id!: string;

  @ManyToOne(() => Director, director => director.movies)
  director: Director;

  @ManyToMany(() => Genre, genre => genre.movies)
  @JoinTable()
  genres: Genre[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
