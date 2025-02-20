import { Controller, Get, HttpException, Query } from '@nestjs/common';
import { format } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
import { QRCodeService } from './qrcode.service';
import { S3Service } from './s3.service';

@Controller('qrcode')
export class QRController {
  constructor(
    private readonly s3Service: S3Service,
    private readonly qRCodeService: QRCodeService,
  ) {}

  @Get('generate')
  async generate(@Query('qrCodeURL') url?: string): Promise<any> {
    if (!url) throw new HttpException('URL is required', 400);

    try {
      const date = format(new Date(), 'yyyy-MM');
      const key = `${uuidv4()}`;

      const qrCodeBuffer = this.qRCodeService.generateQRCode(url);
      const uploadURL = await this.s3Service.uploadFile(
        key,
        qrCodeBuffer,
        'image/png',
        date,
      );

      return uploadURL;
    } catch (e) {
      console.error(e);
      throw new HttpException('Error generating and uploading QR Code', 500);
    }
  }
}
