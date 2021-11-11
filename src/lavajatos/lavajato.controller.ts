import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
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
  private logger = new Logger(LavaJatoController.name);

  constructor(private readonly lavaJatoService: LavaJatoService) {}

  @Post()
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  async createLavaJato(
    @Body() createLavaJatoDto: CreateLavaJatoDto,
  ): Promise<LavaJato> {
    this.logger.log(
      `Start - LavaJatoController.createLavaJato - ${JSON.stringify(
        createLavaJatoDto,
      )}`,
    );
    return await this.lavaJatoService.createLavaJato(createLavaJatoDto);
  }

  @Post('/service')
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  async createLavaJatoService() {}

  @Get('/:id')
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  async findLavaJato(@Param('id') id: String): Promise<LavaJato> {
    this.logger.log(
      `Start - LavaJatoController.findLavaJato - User_Id - ${id}`,
    );
    return await this.lavaJatoService.findLavaJatos(id);
  }
}
