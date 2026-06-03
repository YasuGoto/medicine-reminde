import {
  Controller,
  Post,
  Body,
  Get,
  Request,
  UseGuards,
  Param,
} from '@nestjs/common';
import { LogsService } from './logs.service';
import { JwtGuard } from 'src/auth/jwt.guard';
import { Timing, Status } from '../../generated/prisma/client';

@Controller('medicines/:medicineId/logs')
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  @UseGuards(JwtGuard)
  @Post()
  async create(
    @Param('medicineId') medicineId: string,
    @Body()
    createLogDto: {
      timing: Timing;
      takenAt: Date;
      status: Status;
    },
  ) {
    return this.logsService.create(
      parseInt(medicineId),
      createLogDto.timing,
      createLogDto.takenAt,
      createLogDto.status,
    );
  }

  @UseGuards(JwtGuard)
  @Get()
  async findAll(@Request() req: any, @Param('medicineId') medicineId: string) {
    return this.logsService.findAll(parseInt(medicineId), req.user.id);
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  async findOne(
    @Request() req: any,
    @Param('medicineId') medicineId: string,
    @Param('id') id: string,
  ) {
    return this.logsService.findOne(
      parseInt(id),
      parseInt(medicineId),
      req.user.id,
    );
  }
}
