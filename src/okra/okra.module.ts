import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { OkraController } from './okra.controller';
import { OkraService } from './okra.service';

@Module({
  imports: [HttpModule],
  controllers: [OkraController],
  providers: [OkraService],
})
export class OkraModule {}
