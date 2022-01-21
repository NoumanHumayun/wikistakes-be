import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>
  ) { }

  async create(input) {
    return await this.repo.save(input);
  }

  async update(input: any) {
    const { id, ...rest } = input;
    await this.repo.update(id, { ...rest });
    return await this.user(id);
  }

  async find(input) {
    return await this.repo.findOne(input);
  }

  async user(id: string) {
    return await this.repo.findOne(id);
  }

  async admin(id: string) {
    return await this.repo.findOne({ id: id, role: 'admin' });
  }

  async admins() {
    return await this.repo.find({ role: 'admin' });
  }

  async influencer(id: string) {
    return await this.repo.findOne({ id: id, role: 'influencer' });
  }

  async influencers() {
    return await this.repo.find({ role: 'influencer' });
  }

  async userByEmail(email: string) {
    return await this.repo.findOne({ email });
  }

  async usersByEmail(emails: string[]) {
    return await this.repo.find({ email: In(emails) });
  }

  async users() {
    return await this.repo.find();
  }

  async delete(id: string) {
    const res: any = await this.repo.delete(id);
    if (res.affected) return true;
    return false;
  }

  public async inviteUser(user: IUser) {
    const _user = await this.repo.findOne({ email: user.email });
    if (!_user) return this.repo.save(user);
    return this.repo.save({ id: _user.id, ...user });
  }
}
