import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from './blogs.entity';
import { BlogsService } from './blogs.service';
import { BlogsResolver } from './blogs.resolver';
import { SendgridService } from 'src/sendgrid/sendgrid.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([Blog]),
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: 'supersecret',
        signOptions: { expiresIn: '72h' }
      })
    })
  ],
  providers: [BlogsService, BlogsResolver, SendgridService],
  exports: [BlogsService]
})
export class BlogsModule {}
