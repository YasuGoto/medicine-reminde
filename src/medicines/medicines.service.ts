import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Medicine } from '../../generated/prisma/client';

@Injectable()
export class MedicinesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    userId: number,
    name: string,
    startDate: Date,
    endDate: Date,
    morning: boolean,
    afternoon: boolean,
    evening: boolean,
  ): Promise<Medicine> {
    return this.prisma.medicine.create({
      data: {
        userId,
        name,
        startDate,
        endDate,
        medicineTiming: {
          create: {
            morning: morning,
            afternoon: afternoon,
            evening: evening,
          },
        },
      },
      include: {
        medicineTiming: true,
      },
    });
  }

  async findAll(userId: number): Promise<Medicine[]> {
    return this.prisma.medicine.findMany({
      where: {
        userId,
      },
      include: {
        medicineTiming: true,
      },
    });
  }
}
