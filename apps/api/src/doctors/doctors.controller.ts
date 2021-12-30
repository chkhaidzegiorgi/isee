import { Controller, Get } from '@nestjs/common';
import { DoctorsService } from './doctors.service';

@Controller('doctors')
export class DoctorsController {
  constructor(private service: DoctorsService) {}

  @Get()
  async getList() {
    return await this.service.getList();
  }
}
