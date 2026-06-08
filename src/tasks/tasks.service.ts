import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Status } from '../../generated/prisma/client';
import { Timing } from '../../generated/prisma/client';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleCron() {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);

    const medicines = await this.prisma.medicine.findMany({
      where: {
        startDate: { lte: yesterday },
        endDate: { gte: yesterday },
      },
      include: {
        medicineTiming: true,
      },
    });

    for (const medicine of medicines) {
      const timings = medicine.medicineTiming;
      if (!timings) continue;

      const timingMap = [
        { flag: timings.morning, timing: Timing.MORNING },
        { flag: timings.afternoon, timing: Timing.AFTERNOON },
        { flag: timings.evening, timing: Timing.EVENING },
      ];

      for (const { flag, timing } of timingMap) {
        if (!flag) continue;

        const existinglog = await this.prisma.log.findFirst({
          where: {
            medicineId: medicine.id,
            timing: timing,
            takenAt: {
              gte: yesterday,
              lt: new Date(yesterday.getTime() + 24 * 60 * 60 * 1000),
            },
          },
        });

        if (!existinglog) {
          await this.prisma.log.create({
            data: {
              medicineId: medicine.id,
              timing: timing,
              takenAt: yesterday,
              status: Status.MISSED,
            },
          });
        }
      }
    }
  }
}
