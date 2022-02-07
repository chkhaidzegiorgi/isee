import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VisitEntity } from '../entities/visit.entity';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';

@Module({
  controllers: [ReportsController],
  imports:[TypeOrmModule.forFeature([VisitEntity])],
  providers: [ReportsService],
})
export class ReportsModule {}
