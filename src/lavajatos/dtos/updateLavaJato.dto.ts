import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateLavaJatoDto {
  @IsNotEmpty()
  @IsString()
  readonly id_service: String;
  @IsNotEmpty()
  @IsString()
  readonly description: String;
  @IsNotEmpty()
  @IsNumber()
  readonly price: Number;
}
