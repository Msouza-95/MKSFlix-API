import { Cast } from 'src/module/cast/infra/typeorm/entities/cast.entity';
import { Director } from 'src/module/director/infra/typeorm/entities/director.entity';
import { Genre } from 'src/module/genre/infra/typeorm/entities/genre.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { uuid } from 'uuidv4';

@Entity('movie')
export class Movie {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column()
  year!: number;

  @Column()
  duration!: number;

  @Column()
  synopsis!: string;

  @Column()
  genre_id!: string;

  @Column()
  director_id!: string;

  @ManyToOne(() => Genre)
  @JoinColumn({ name: 'genre_id' })
  genre!: Genre;

  @ManyToOne(() => Director)
  @JoinColumn({ name: 'director_id' })
  director!: Director;

  @OneToMany(() => Cast, cast => cast.movie)
  casts!: Cast[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
