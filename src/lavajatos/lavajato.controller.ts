import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateLavaJatoDto } from './dtos/createLavaJato.dto';
import { UpdateLavaJatoDto } from './dtos/updateLavaJato.dto';
import { LavaJato } from './interfaces/lavajato.interface';
import { LavaJatoService } from './services/lavajato.service';

@Controller('lavajato')
export class LavaJatoController {
  private logger = new Logger(LavaJatoController.name);

  constructor(private readonly lavaJatoService: LavaJatoService) {}

  @Post('/create')
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

  @Put('/service')
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  async createLavaJatoService(@Body() updateLavaJatoDto: UpdateLavaJatoDto) {
    this.logger.log(`Update Lava_Jato ${updateLavaJatoDto} `);
    return await this.lavaJatoService.updateLavaJatoService(updateLavaJatoDto);
  }

  @Get('/:id')
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  async findLavaJato(@Param('id') id: String): Promise<LavaJato> {
    this.logger.log(
      `Start - LavaJatoController.findLavaJato - User_Id - ${id}`,
    );
    return await this.lavaJatoService.findLavaJatos(id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAllLavaJatos(): Promise<Array<LavaJato>> {
    this.logger.log(`Start - LavaJatoController.findAllLavaJatos`);
    return await this.lavaJatoService.findAllLavaJatos();
  }
}
