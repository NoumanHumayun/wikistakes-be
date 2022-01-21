import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Blog } from './blogs.entity';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Blog) private readonly repo: Repository<Blog>
  ) { }

  async create(input) {
    return await this.repo.save(input);
  }

  async update(input: any) {
    const { id, ...rest } = input;
    await this.repo.update(id, { ...rest });
    return await this.blog(id);
  }

  async find(input) {
    return await this.repo.findOne(input);
  }

  async blog(id: string) {
    return await this.repo.findOne(id);
  }

  async blogs() {
    return await this.repo.find();
  }

  async delete(id: string) {
    const res: any = await this.repo.delete(id);
    if (res.affected) return true;
    return false;
  }

}
