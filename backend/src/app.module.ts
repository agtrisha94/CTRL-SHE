import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { FlavorModule } from './flavor/flavor.module';
import { ScanModule } from './scan/scan.module';

@Module({
  imports: [
    ConfigModule.forRoot(
      {
        isGlobal: true,
      }
    ),
    PrismaModule,
    AuthModule,
    UsersModule,
    FlavorModule,
    ScanModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
