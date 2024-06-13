import { Movie } from 'src/module/movie/infra/typeorm/entities/movie.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { uuid } from 'uuidv4';

@Entity('review')
export class Review {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  reviewer!: string;

  @Column()
  rating!: number;

  @ManyToOne(() => Movie)
  movie!: Movie;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at!: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
