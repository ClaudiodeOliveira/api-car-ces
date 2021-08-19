import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AtualizarJogador } from './dtos/atualizarJogador.dto';
import { CriarJogadorDto } from './dtos/criarJogador.dto';
import { Jogador } from './interfaces/jogador.interfaces';
import { JogadoresService } from './jogadores.service';
import { ValidacaoParamentrosPipe } from '../common/pipes/validacao-paramentros.pipe';

@Controller('api/v1/jogadores')
export class JogadoresController {
  constructor(private readonly jogadoresService: JogadoresService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async criarJogador(
    @Body() criarJogadorDto: CriarJogadorDto,
  ): Promise<Jogador> {
    return await this.jogadoresService.criarJogador(criarJogadorDto);
  }

  @Put('/:_id')
  @UsePipes(ValidationPipe)
  async atualizarJogador(
    @Body() atualizarJogador: AtualizarJogador,
    @Param('_id', ValidacaoParamentrosPipe) _id: String,
  ): Promise<Jogador> {
    return await this.jogadoresService.atualizarJogador(_id, atualizarJogador);
  }

  @Get('/:_id')
  async consutarJogador(
    @Param('_id', ValidacaoParamentrosPipe) _id: string,
  ): Promise<Jogador> {
    if (_id) {
      return await this.jogadoresService.consultarJogadoresPorId(_id);
    }
  }

  @Get()
  async consultarJogadores(): Promise<Array<Jogador>> {
    return await this.jogadoresService.consultarTodosJogadores();
  }

  @Delete('/:_id')
  async deletarJogadorPorEmail(
    @Param('_id', ValidacaoParamentrosPipe) _id: string,
  ): Promise<void> {
    this.jogadoresService.deletarJogadorPorEmail(_id);
  }
}
