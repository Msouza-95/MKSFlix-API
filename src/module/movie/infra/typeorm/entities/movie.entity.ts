import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { uuid } from 'uuidv4';

@Entity('movie')
export class Movie {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column()
  releaseYear!: number;

  // @Column()
  // director_id!: string;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
