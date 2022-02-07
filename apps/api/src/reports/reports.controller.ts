import { Controller, Get, Query } from '@nestjs/common';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private service: ReportsService) {}

  @Get()
  async getByMonth(@Query() query) {
    return await this.service.getByMonth(query);
  }
}
