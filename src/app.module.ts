import { join } from 'path';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configurations from './config/configurations';
import { SendgridService } from './sendgrid/sendgrid.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { BlogsModule } from './blogs/blogs.module';
import { SweepsModule } from './sweeps/sweeps.module';

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
      load: [configurations]
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.get('database'),
      inject: [ConfigService]
    }),
    GraphQLModule.forRoot({
      playground: true,
      introspection: true,
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts')
      },
      installSubscriptionHandlers: true,
      subscriptions: {
        keepAlive: 5000
      }
    }),
    AuthModule,
    UsersModule,
    BlogsModule,
    SweepsModule,
  ],
  controllers: [AppController],
  providers: [AppService, SendgridService]
})
export class AppModule {}
