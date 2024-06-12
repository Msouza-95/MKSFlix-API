import { Inject, Injectable } from '@nestjs/common';

import { Cast } from '../infra/typeorm/entities/cast.entity';
import ICastRepository from '../repositories/I-cast-repository';

@Injectable()
export class ShowCastUseCase {
  constructor(
    @Inject('ICastRepository')
    private castRepositoy: ICastRepository,
  ) {}
  async execute(): Promise<Cast[]> {
    const cast = await this.castRepositoy.show();

    return cast;
  }
}
