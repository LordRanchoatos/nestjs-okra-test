import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OkraModule } from './okra/okra.module';

@Module({
  imports: [
    // ConfigModule.forRoot({
    //   isGlobal: true
    // }),
    OkraModule
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
