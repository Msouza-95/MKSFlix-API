import { ConflictException, Inject, Injectable } from '@nestjs/common';

import { ICreateDirectorDto } from '../dto/create-director.dto';
import { Director } from '../infra/typeorm/entities/director.entity';
import IDirectorRepository from '../repositories/I-director-repository';

@Injectable()
export class CreateDirectorUseCase {
  constructor(
    @Inject('IDirectorRepository')
    private directorRepositoy: IDirectorRepository,
  ) {}
  async execute({ name }: ICreateDirectorDto): Promise<Director> {
    const director = await this.directorRepositoy.findByName(name);

    if (director) {
      throw new ConflictException('The director already exist ');
    }

    const newDirector = await this.directorRepositoy.create({
      name,
    });

    return newDirector;
  }
}
