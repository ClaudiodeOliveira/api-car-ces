import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { LavajatosModule } from './lavajatos/lavajatos.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://root:"password"@gerenciador-api.gvhvz.mongodb.net/api-car?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
      },
    ),
    AuthModule,
    UsersModule,
    LavajatosModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
