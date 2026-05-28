import { Module } from '@nestjs/common';
import { MedicinesService } from './medicines.service';
import { MedicinesController } from './medicines.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';
import { RedisModule } from 'src/redis/redis.module';

@Module({
  imports: [PrismaModule, AuthModule, RedisModule],
  providers: [MedicinesService],
  controllers: [MedicinesController],
})
export class MedicinesModule {}
