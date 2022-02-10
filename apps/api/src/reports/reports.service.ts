import { ReportByMonth } from '@isee/api-interfaces';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { VisitEntity } from '../entities/visit.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(VisitEntity)
    private visitsRepository: Repository<VisitEntity>
  ) {}

  async getByMonth(query: { startDate: string; endDate: string }) {
    const startDate = new Date(query.startDate);
    const endDate = new Date(query.endDate);

    return await this.visitsRepository
      .createQueryBuilder('visit')
      .select('visit.doctorId')
      .addSelect("TO_CHAR (visit.visit_date, 'YYYY')", 'year')
      .addSelect("TO_CHAR (visit.visit_date, 'mm')", 'month')
      .addSelect('SUM(visit.price)', 'sumPrice')
      .addSelect('COUNT(visit.doctorId)', 'patientCount')
      .where('visit.visit_date > :start_at', { start_at: startDate })
      .andWhere('visit.visit_date < :end_at', { end_at: endDate })
      .groupBy('visit.doctorId')
      .addGroupBy('year')
      .addGroupBy('month')
      .orderBy('year')
      .addOrderBy('month')
      .getRawMany();
  }
}
