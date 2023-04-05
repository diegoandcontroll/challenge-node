import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  constructor(
    private readonly cloudName: string,
    private readonly apiKey: string,
    private readonly apiSecret: string,
  ) {
    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
    });
  }
  public async uploadImage(
    image: Express.Multer.File,
    folder?: string,
  ): Promise<string> {
    const options = folder ? { folder } : undefined;
    const uploadResult = await cloudinary.uploader.upload(image.path, options);
    return uploadResult.url;
  }
}
