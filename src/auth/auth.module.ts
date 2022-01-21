import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { GqlAuthGuard } from './GQL-auth.guard';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: 'supersecret',
        signOptions: { expiresIn: '72h' }
      })
    })
  ],
  providers: [JwtStrategy, GqlAuthGuard]
})
export class AuthModule {}
