import { Module } from '@nestjs/common';
import { MedicinesService } from './medicines.service';
import { MedicinesController } from './medicines.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';
import { RedisModule } from 'src/redis/redis.module';
import { LogsService } from './logs.service';
import { LogsController } from './logs.controller';

@Module({
  imports: [PrismaModule, AuthModule, RedisModule],
  providers: [MedicinesService, LogsService],
  controllers: [MedicinesController, LogsController],
})
export class MedicinesModule {}
