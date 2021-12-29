import { Patient } from '@isee/api-interfaces';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { PatientsService } from './patients.service';

@Controller('patients')
export class PatientsController {
  constructor(private service: PatientsService) {}

  @Get()
  async getList(
    @Param('searchValue') keyword: string,
    @Param('searchValue') page: number,
    @Param('searchValue') take: number
  ) {
    return await this.service.getPatients(keyword, page, take);
  }

  @Post()
  @HttpCode(201)
  async create(@Body() patient: Patient) {
    return await this.service.create(patient);
  }

  @Put(':id')
  @HttpCode(200)
  async modify(@Param('id') id: string, @Body() patient: Patient) {
    return await this.service.modify(id, patient);
  }
}
