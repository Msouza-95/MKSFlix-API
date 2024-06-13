import { Actor } from 'src/module/actor/infra/typeorm/entities/actor.entity';
import { Movie } from 'src/module/movie/infra/typeorm/entities/movie.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
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

  @Column()
  movie_id!: string;

  @Column()
  actor_id!: string;

  @ManyToOne(() => Movie, movie => movie.casts)
  @JoinColumn({ name: 'movie_id' })
  movie!: Movie;

  @ManyToOne(() => Actor, actor => actor.cast)
  @JoinColumn({ name: 'actor_id' })
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
