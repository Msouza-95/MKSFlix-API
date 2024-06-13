import { ZodValidationPipe } from 'src/pipes/zod-validation.-pipe';
import { z } from 'zod';

import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

const createCastBody = z.object({
  role: z.string(),
  actor_id: z.string().uuid(),
  movie_id: z.string().uuid(),
});

type CreateCastBody = z.infer<typeof createCastBody>;

@Controller('sessions')
@ApiTags('sessions')
export class AuthController {
  constructor(private readonly jwt: JwtService) {}

  @Post()
  @ApiOperation({ summary: 'Realizar login' })
  async create() {
    const token = this.jwt.sign({ sub: 'user-id' });

    return 'teste';
  }
}
