import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateLavaJatoDto {
  @IsNotEmpty()
  @IsString()
  readonly _id: String;
  @IsNotEmpty()
  @IsString()
  readonly description: String;
  @IsNotEmpty()
  @IsNumber()
  readonly price: Number;
}
