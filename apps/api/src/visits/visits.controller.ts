import { Patient } from '@isee/api-interfaces';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { VisitsService } from './visits.service';

@Controller('visits')
export class VisitsController {
  constructor(private service: VisitsService) {}

  @Get()
  async getList(@Query() query) {
    return await this.service.getList(query);
  }

  @Get('/:id')
  async get(@Param('id') id: string) {
    return await this.service.get(id);
  }

  @Post()
  @HttpCode(201)
  async create(@Body() patient: Patient) {
    return await this.service.create(patient);
  }

  @Put('/:id')
  @HttpCode(200)
  async modify(@Param('id') id: string, @Body() patient: Patient) {
    return await this.service.modify(id, patient);
  }
}
