import {
  Body,
  Controller,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateLavaJatoDto } from './dtos/createLavaJato.dto';
import { LavaJato } from './interfaces/lavajato.interface';
import { LavaJatoService } from './services/lavajato.service';

@Controller('lavajato/create')
export class LavaJatoController {
  constructor(private readonly lavaJatoService: LavaJatoService) {}

  @Post()
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  async createLavaJato(
    @Body() createLavaJato: CreateLavaJatoDto,
  ): Promise<LavaJato> {
    return await this.lavaJatoService.createLavaJato(createLavaJato);
  }

  @Post('/service')
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  async createLavaJatoService() {}
}
