import { Document } from 'mongoose';

export interface User extends Document {
  readonly username: String;
  readonly email: String;
  roles: Role[];
  password: String;
}

export enum Role {
  Common = 'comum',
  Company = 'empresa',
  Admin = 'admin',
}
