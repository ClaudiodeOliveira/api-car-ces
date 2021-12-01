import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersService } from 'src/users/services/users.service';
import { CreateLavaJatoDto } from '../dtos/createLavaJato.dto';
import { CreateLavaJatoServiceDto } from '../dtos/createLavaJatoService.dto';
import { LavaJatoDto } from '../dtos/lavaJato.dto copy';
import { UpdateLavaJatoDto } from '../dtos/updateLavaJato.dto';
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
    const { name, street, number, city, state, complement, zipcode, lat, lng } =
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
      lat,
      lng,
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

  async findAllLavaJatos(): Promise<Array<LavaJato>> {
    this.logger.log(`Finding all LavaJatos`);
    return await this.lavajatoModel.find().exec();
  }

  async createLavaJatoService(
    createLavaJatoServiceDto: CreateLavaJatoServiceDto,
  ): Promise<void> {
    this.logger.log(`Create LavaJato Service`);
    const { _id, description, price } = createLavaJatoServiceDto;
    this.logger.log(`id: ${_id}`);
    const lavaJato = await this.lavajatoModel.findOne({ _id }).exec();
    if (!lavaJato) throw new Error('LavaJato not found');
    lavaJato.services.push({ description, price });
    await this.lavajatoModel.updateOne({ _id }, lavaJato).exec();
  }

  async updateLavaJatoService(updateLavaJatoDto: UpdateLavaJatoDto) {
    this.logger.log(`Updating LavaJato`);
    const { description, price, id_service } = updateLavaJatoDto;
    const lavaJato = await this.lavajatoModel
      .findOne({ 'services._id': id_service })
      .exec();
    if (!lavaJato) throw new Error('LavaJato not found');
    const { _id } = lavaJato;
    lavaJato.services.find((ser) => {
      let { _id } = JSON.parse(JSON.stringify(ser));
      if (_id === id_service) {
        ser.description = description;
        ser.price = price;
      }
    });

    await this.lavajatoModel.updateOne({ _id }, lavaJato).exec();
  }

  async deleteLavaJato(id: String): Promise<void> {
    this.logger.log(`Deleting LavaJato`);
    await this.lavajatoModel.findOneAndDelete({ _id: id }).exec();
  }

  async deleteLavaJatoService(id: String): Promise<void> {
    this.logger.log(`Deleting LavaJato Service`);
    const lavaJato = await this.lavajatoModel
      .findOne({ 'services._id': id })
      .exec();
    lavaJato.services.find((ser) => {
      let { _id } = JSON.parse(JSON.stringify(ser));
      if (_id === id) {
        lavaJato.services.splice(lavaJato.services.indexOf(ser), 1);
      }
    });
    lavaJato.save();
  }
}
