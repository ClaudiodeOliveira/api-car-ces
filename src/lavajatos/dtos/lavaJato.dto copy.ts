import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { User } from 'src/users/interface/user.interface';
import { Address, Service } from '../interfaces/lavajato.interface';

export class LavaJatoDto {
  @IsNotEmpty()
  @IsString()
  name: String;
  @IsNotEmpty()
  @IsString()
  user: User;
  address: Address;
  services: Array<Service>;
}
