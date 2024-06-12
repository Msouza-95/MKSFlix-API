import { ICreateDirectorDto } from 'src/module/director/dto/create-director.dto';
import { CreateDirectorUseCase } from 'src/module/director/use-cases/create-director';
import { ShowDirectorUseCase } from 'src/module/director/use-cases/show-director';

import { Controller, Get, Post, Body } from '@nestjs/common';

@Controller('director')
export class DirectorController {
  constructor(
    private readonly createDirectorUseCase: CreateDirectorUseCase,
    private readonly showDirectorUseCase: ShowDirectorUseCase,
  ) {}

  @Post()
  create(@Body() createDirectorDto: ICreateDirectorDto) {
    return this.createDirectorUseCase.execute(createDirectorDto);
  }

  @Get()
  findAll() {
    return this.showDirectorUseCase.execute();
  }
}
