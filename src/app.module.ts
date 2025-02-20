import { Module } from '@nestjs/common';
import { QRModule } from './qr/qrcode.module';

@Module({
  imports: [
    QRModule
  ],
})
export class AppModule { }
