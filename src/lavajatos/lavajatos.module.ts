import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'src/users/users.module';
import { LavaJatoSchema } from './interfaces/lavajato.schema';
import { LavaJatoController } from './lavajato.controller';
import { LavaJatoService } from './services/lavajato.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'LavaJato', schema: LavaJatoSchema }]),
    UsersModule,
    HttpModule,
  ],
  controllers: [LavaJatoController],
  providers: [LavaJatoService],
})
export class LavajatosModule {}
