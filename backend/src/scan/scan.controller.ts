import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ScanService } from './scan.service';

@Controller('scan')
export class ScanController {
  constructor(private readonly scanService: ScanService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async scanLabel(@UploadedFile() file: Express.Multer.File) {
  console.log("FILE RECEIVED:", file?.originalname);
  return this.scanService.processImage(file.buffer);
}

}
