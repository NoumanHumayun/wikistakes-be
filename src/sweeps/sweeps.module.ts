import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sweep } from './sweeps.entity';
import { SweepsService } from './sweeps.service';
import { SweepsResolver } from './sweeps.resolver';
import { SendgridService } from 'src/sendgrid/sendgrid.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { S3Module } from 'src/s3/s3.module';

@Module({
  imports: [
    UsersModule,
    S3Module,
    TypeOrmModule.forFeature([Sweep]),
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: 'supersecret',
        signOptions: { expiresIn: '72h' }
      })
    })
  ],
  providers: [SweepsService, SweepsResolver, SendgridService],
  exports: [SweepsService]
})
export class SweepsModule {}
