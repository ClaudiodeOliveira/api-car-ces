import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateLavaJatoDto {
  @IsNotEmpty()
  @IsString()
  readonly name: String;
  @IsNotEmpty()
  @IsString()
  readonly user_id: String;
  @IsNotEmpty()
  @IsString()
  readonly city: String;
  @IsNotEmpty()
  @IsString()
  readonly state: String;
  @IsNotEmpty()
  @IsString()
  readonly zipcode: String;
  @IsNotEmpty()
  @IsNumber()
  readonly number: Number;
  @IsNotEmpty()
  @IsString()
  readonly street: String;
  @IsNotEmpty()
  @IsString()
  readonly complement: String;
}
