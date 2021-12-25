import { Controller, Get } from '@nestjs/common';
import { PatientsService } from './patients.service';

@Controller('patients')
export class PatientsController {
  constructor(private service: PatientsService) {}

  @Get()
  getList() {
    return this.service.getPatients();
  }
}
