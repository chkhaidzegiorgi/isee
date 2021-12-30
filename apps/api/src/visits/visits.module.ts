import { Module } from '@nestjs/common';
import { VisitsService } from './visits.service';
import { VisitsController } from './visits.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VisitEntity } from '../entities/visit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VisitEntity])],
  providers: [VisitsService],
  controllers: [VisitsController],
})
export class VisitsModule {}
