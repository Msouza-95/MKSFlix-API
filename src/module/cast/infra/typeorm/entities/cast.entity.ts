import { Actor } from 'src/module/actor/infra/typeorm/entities/actor.entity';
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

@Entity('cast')
export class Cast {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  role!: string;

  @ManyToOne(() => Movie)
  movie!: Movie;

  @ManyToOne(() => Actor)
  actor!: Actor;

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
