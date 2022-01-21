import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Sweep } from './sweeps.entity';

@Injectable()
export class SweepsService {
  constructor(
    @InjectRepository(Sweep) private readonly repo: Repository<Sweep>
  ) { }

  async create(input) {
    return await this.repo.save(input);
  }

  async update(input: any) {
    const { id, ...rest } = input;
    await this.repo.update(id, { ...rest });
    return await this.sweep(id);
  }

  async find(input) {
    return await this.repo.findOne(input);
  }

  async sweep(id: string) {
    return await this.repo.findOne(id);
  }

  async sweeps() {
    return await this.repo.find();
  }

  async delete(id: string) {
    const res: any = await this.repo.delete(id);
    if (res.affected) return true;
    return false;
  }

}
