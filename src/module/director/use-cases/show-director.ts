import { ConflictException, Inject, Injectable } from '@nestjs/common';

import { ICreateDirectorDto } from '../dto/create-director.dto';
import { Director } from '../infra/typeorm/entities/director.entity';
import IDirectorRepository from '../repositories/I-director-repository';

@Injectable()
export class ShowDirectorUseCase {
  constructor(
    @Inject('IDirectorRepository')
    private directorRepositoy: IDirectorRepository,
  ) {}
  async execute(): Promise<Director[]> {
    const directors = await this.directorRepositoy.show();

    return directors;
  }
}
