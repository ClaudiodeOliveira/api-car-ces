import { Document } from 'mongoose';
import { User } from 'src/users/interface/user.interface';

export interface LavaJato extends Document {
  readonly name: String;
  readonly user: User;
  readonly address: Address;
  readonly services: Array<Service>;
}

export interface Service {
  description: String;
  price: Number;
}

export interface Address {
  street: String;
  complement: String;
  number: Number;
  city: String;
  state: String;
  zipcode: String;
  lat: String;
  lng: String;
}
