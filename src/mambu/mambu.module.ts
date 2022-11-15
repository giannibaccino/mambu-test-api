import { Module } from '@nestjs/common';
import { MambuService } from './services/mambu.service';
import { MambuController } from './controllers/mambu.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    HttpModule
  ],
  providers: [MambuService],
  controllers: [MambuController]
})
export class MambuModule {}
