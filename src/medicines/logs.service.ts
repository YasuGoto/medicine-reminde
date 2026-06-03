import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Log } from '../../generated/prisma/client';
import { Timing, Status } from '../../generated/prisma/client';

@Injectable()
export class LogsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    medicineId: number,
    timing: Timing,
    takenAt: Date,
    status: Status,
  ): Promise<Log> {
    return this.prisma.log.create({
      data: {
        medicineId,
        timing,
        takenAt,
        status,
      },
    });
  }

  async findAll(medicineId: number, userId: number): Promise<Log[]> {
    return this.prisma.log.findMany({
      where: {
        medicineId,
        medicine: {
          userId,
        },
      },
      include: {
        medicine: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async findOne(
    id: number,
    medicineId: number,
    userId: number,
  ): Promise<Log | null> {
    return this.prisma.log.findUnique({
      where: {
        id,
        medicineId,
        medicine: {
          userId,
        },
      },
      include: {
        medicine: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }
}
