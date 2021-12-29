import { Paging, Patient } from '@isee/api-interfaces';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { PatientsService } from './patients.service';

@Controller('patients')
export class PatientsController {
  constructor(private service: PatientsService) {}

  @Get()
  async getList(@Query() query) {
    return await this.service.getPatients(query);
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
