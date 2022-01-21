import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { SendgridService } from 'src/sendgrid/sendgrid.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: 'supersecret',
        signOptions: { expiresIn: '72h' }
      })
    })
  ],
  providers: [UsersService, UsersResolver, SendgridService],
  exports: [UsersService]
})
export class UsersModule { }
