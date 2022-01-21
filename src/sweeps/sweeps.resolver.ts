import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent
} from '@nestjs/graphql';
import { SweepsService } from './sweeps.service';
import { Sweep } from './sweeps.entity';
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/GQL-auth.guard';
import { SendgridService } from 'src/sendgrid/sendgrid.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import { S3Service } from 'src/s3/s3.service';
import * as fs from 'fs';

@Resolver('Sweep')
export class SweepsResolver {
  constructor(
    private readonly sweepsService: SweepsService,
    private readonly sendgridService: SendgridService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
    private readonly s3: S3Service
  ) {}

  async uploadFiles(files: any): Promise<string[]> {
    const path = 'public';
    return await Promise.all(
      files.map(async (_file: any) => {
        if (!_file) return _file;
        const { filename, encoding, mimetype, createReadStream } = _file;
        const fileStream = createReadStream();
        fileStream.on('error', (error) => console.error(error));

        const fp = await this.s3.upload(
          fileStream,
          mimetype,
          encoding,
          {
            acl: 'public',
            filename: filename,
            contentType: mimetype,
            encoding
          },
          path
        );
        return fp;
      })
    );
  }

  @Query()
  async sweep(@Args('id') id: string) {
    return await this.sweepsService.sweep(id);
  }

  @Query()
  @UseGuards(GqlAuthGuard)
  async sweeps() {
    return await this.sweepsService.sweeps();
  }

  @Mutation()
  async addSweep(@Args('input') input) {
    const { influencer, sweep } = input;
    const { id, startDate, endDate, description } = sweep;

    let user = this.usersService.find({ email: influencer.email });

    if (!(await user)) user = this.usersService.create(influencer);

    const { social1, social2 } = await user;
    const _sweep = new Sweep();
    _sweep.id = id;
    _sweep.title = `Meet with ${social1 ? social1 : social2}`;
    _sweep.startDate = startDate;
    _sweep.endDate = endDate;
    _sweep.description = description;
    _sweep.influencer = user;

    const __sweep = await this.sweepsService.create(_sweep);

    // const token = this.jwtService.sign({ ...__sweep });
    // this.sendgridService.sendEmail('sweepCreated', [input.email], {
    //   sweepUrl: `${this.configService.get('appUrl')}sweep/${token}`
    // });

    return __sweep;
  }

  @Mutation()
  async addSweepFiles(@Args('files') files, @Args('id') id) {
    files = await Promise.all(files);
    var first = files.slice(0, 2);
    var second = files.slice(3);

    const filePaths1 = await this.uploadFiles(first);
    const filePaths2 = await this.uploadFiles(second);

    const _sweep = await this.sweepsService.find({ id: id });

    _sweep.file1 = filePaths1[0] ? filePaths1[0] : '';
    _sweep.file2 = filePaths1[1] ? filePaths1[1] : '';
    _sweep.file3 = filePaths1[2] ? filePaths1[2] : '';

    _sweep.file4 = filePaths2[0] ? filePaths2[0] : '';
    _sweep.file5 = filePaths2[1] ? filePaths2[1] : '';
    _sweep.file6 = filePaths2[2] ? filePaths2[2] : '';

    const __sweep = await this.sweepsService.update(_sweep);

    return __sweep;
  }
  @Mutation()
  @UseGuards(GqlAuthGuard)
  async updateSweep(@Args('input') input: any) {
    const { sweepId, ...rest } = input;
    const eta = await this.sweepsService.update(input);
    return eta;
  }

  @Mutation()
  @UseGuards(GqlAuthGuard)
  async deleteSweep(@Args('id') id: string) {
    return await this.sweepsService.delete(id);
  }

  @ResolveField()
  public async influencer(@Parent() parent: Sweep) {
    return parent.influencer;
  }

  @ResolveField()
  public async winner(@Parent() parent: Sweep) {
    return parent.winner;
  }
}
