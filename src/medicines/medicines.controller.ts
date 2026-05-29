import {
  Controller,
  Post,
  UseGuards,
  Body,
  Request,
  Get,
  Param,
  Delete,
} from '@nestjs/common';
import { MedicinesService } from './medicines.service';
import { JwtGuard } from 'src/auth/jwt.guard';

@Controller('medicines')
export class MedicinesController {
  constructor(private readonly medicinesService: MedicinesService) {}

  @Post()
  @UseGuards(JwtGuard)
  async create(
    @Request() req: any,
    @Body()
    createDto: {
      name: string;
      startDate: Date;
      endDate: Date;
      morning: boolean;
      afternoon: boolean;
      evening: boolean;
    },
  ) {
    return this.medicinesService.create(
      req.user.id,
      createDto.name,
      createDto.startDate,
      createDto.endDate,
      createDto.morning,
      createDto.afternoon,
      createDto.evening,
    );
  }

  @Get()
  @UseGuards(JwtGuard)
  async findAll(@Request() req: any) {
    return this.medicinesService.findAll(req.user.id);
  }

  @Get(':id')
  @UseGuards(JwtGuard)
  async findOne(@Request() req: any, @Param('id') id: string) {
    return this.medicinesService.findOne(parseInt(id), req.user.id);
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  async delete(@Request() req: any, @Param('id') id: string) {
    return this.medicinesService.delete(parseInt(id), req.user.id);
  }
}
