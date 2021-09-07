import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controller/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './models/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtGuard } from './guard/jwt.guard';
import { JwtStrategy } from './guard/jwt.stratigy';

@Module({
  imports:[JwtModule.registerAsync({
    useFactory:()=>({
      secret:process.env.JWT_SECRET,
      signOptions:{expiresIn:'3600s'}
    })
  })
    ,TypeOrmModule.forFeature([UserEntity])
  ],
  providers: [AuthService,JwtGuard,JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
