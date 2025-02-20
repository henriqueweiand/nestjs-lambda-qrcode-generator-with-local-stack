import { Module } from '@nestjs/common';
import { QRController } from './qrcode.controller';
import { QRCodeService } from './qrcode.service';
import { S3Service } from './s3.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [QRController],
  providers: [S3Service, QRCodeService],
})
export class QRModule { }