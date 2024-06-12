import { DeleteResult } from 'typeorm';

import { Inject, Injectable } from '@nestjs/common';

import ICastRepository from '../repositories/I-cast-repository';

@Injectable()
export class DeleteCastUseCase {
  constructor(
    @Inject('ICastRepository')
    private castRepositoy: ICastRepository,
  ) {}
  async execute(cast_id: string): Promise<DeleteResult> {
    const result = await this.castRepositoy.delete(cast_id);

    return result;
  }
}
