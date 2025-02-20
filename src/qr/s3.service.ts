import * as AWS from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3Service {
  private s3: AWS.S3;
  private isProduction: boolean = false;

  constructor(private readonly configService: ConfigService) {
    this.isProduction = configService.getOrThrow('NODE_ENV') === 'production';

    const s3Config: AWS.S3ClientConfig = {
      forcePathStyle: true,
      maxAttempts: 1,
    };

    if (!this.isProduction) {
      s3Config.credentials = {
        accessKeyId: configService.getOrThrow('AWS_ACCESS_KEY_ID'),
        secretAccessKey: configService.getOrThrow('AWS_SECRET_ACCESS_KEY'),
      };
      s3Config.region = configService.getOrThrow('AWS_REGION');
      s3Config.endpoint = configService.getOrThrow('AWS_ENDPOINT');
      s3Config.tls = false;
    }

    this.s3 = new AWS.S3(s3Config);
  }

  async uploadFile(
    key: string,
    body: any,
    mimeType: string,
    folder?: string,
  ): Promise<string> {
    const fullKey = folder ? `${folder}/${key}` : key;

    const params = {
      Bucket: this.configService.getOrThrow('BUCKET_NAME'),
      Key: fullKey,
      Body: body,
      ContentType: mimeType,
      ACL: 'public-read' as AWS.ObjectCannedACL,
    };

    console.info('uploadFile:', {
      bucket: params.Bucket,
      key: params.Key,
      ContentType: params.ContentType,
    });

    try {
      await this.s3.send(new AWS.PutObjectCommand(params));
    } catch (e) {
      console.error('Error uploading file:', e);
      throw e;
    }

    return this._getPublicUrl(fullKey);
  }

  private _getPublicUrl(key: string): string {
    let url: string;

    if (this.isProduction) {
      url = `https://${this.configService.getOrThrow('BUCKET_NAME')}.s3.amazonaws.com/${key}`;
    } else {
      url = `${this.configService.getOrThrow('AWS_ENDPOINT')}/${this.configService.getOrThrow('BUCKET_NAME')}/${key}`;
    }

    console.info('getPublicUrl:', url);
    return url;
  }
}
