import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersService } from 'src/users/services/users.service';
import { CreateLavaJatoDto } from '../dtos/createLavaJato.dto';
import { LavaJatoDto } from '../dtos/lavaJato.dto copy';
import { LavaJato } from '../interfaces/lavajato.interface';

@Injectable()
export class LavaJatoService {
  private logger = new Logger(LavaJatoService.name);
  constructor(
    @InjectModel('LavaJato') private readonly lavajatoModel: Model<LavaJato>,
    private readonly usersService: UsersService,
  ) {}

  async createLavaJato(createLavaJato: CreateLavaJatoDto): Promise<LavaJato> {
    this.logger.log(`Creating a new LavaJato`);
    const user = await this.usersService.findById(createLavaJato.user_id);
    if (!user) {
      throw new Error('User not found');
    }
    const { name, street, number, city, state, complement, zipcode } =
      createLavaJato;
    const lavaJatoDto = new LavaJatoDto();
    lavaJatoDto.name = name;
    lavaJatoDto.user = user;
    lavaJatoDto.address = {
      street,
      number,
      city,
      state,
      complement,
      zipcode,
    };

    this.logger.log(lavaJatoDto.name);

    const lavajato = new this.lavajatoModel(lavaJatoDto);
    this.logger.log(lavajato);
    return await lavajato.save();
  }

  async findLavaJatos(id: String): Promise<LavaJato> {
    this.logger.log(`Finding LavaJatos`);
    const user = await this.usersService.findById(id);
    if (!user) throw new Error('User not found');
    return this.lavajatoModel.findOne({ user: user._id }).exec();
  }
}
