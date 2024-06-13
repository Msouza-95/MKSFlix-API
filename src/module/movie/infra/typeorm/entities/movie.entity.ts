import { Director } from 'src/module/director/infra/typeorm/entities/director.entity';
import { Genre } from 'src/module/genre/infra/typeorm/entities/genre.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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

  @ManyToOne(() => Genre)
  genre!: Genre;

  @ManyToOne(() => Director)
  director!: Director;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
