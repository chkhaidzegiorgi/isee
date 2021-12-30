import { ListResult, Paging } from '@isee/api-interfaces';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Like, Repository, UpdateResult } from 'typeorm';
import { VisitEntity } from '../entities/visit.entity';

@Injectable()
export class VisitsService {
  constructor(
    @InjectRepository(VisitEntity)
    private repository: Repository<VisitEntity>
  ) {}

  async getList(
    query: Paging & { searchValue: string }
  ): Promise<ListResult<VisitEntity>> {
    const take = query.take || 10;
    const page = query.page || 1;
    const skip = page * take;
    const keyword = query.searchValue || '';

    const [result, total] = await this.repository.findAndCount({
      order: { created_at: 'DESC' },
      take: take,
      skip: skip,
      relations: ['patient', 'doctor'],
    });

    return {
      records: result,
      count: total,
    };
  }

  async get(id: string): Promise<VisitEntity> {
    return await this.repository.findOne(id, {
      relations: ['patient', 'doctor'],
    });
  }

  async create(entity): Promise<InsertResult> {
    entity.updated_by = 'Giorgi';
    return await this.repository.insert(entity);
  }

  async modify(id, entity): Promise<UpdateResult> {
    entity.updated_by = 'Giorgi';
    return await this.repository.update(id, entity);
  }
}
