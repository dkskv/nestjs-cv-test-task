import { Injectable } from '@nestjs/common';
import { Prisma } from '../../../prisma/generated/client.js';
import { PrismaService } from '../../prisma/prisma.service.js';

interface ExperienceCreateData {
  company: string;
  position: string;
  startedAt: Date;
  endedAt?: Date | null;
  achievements?: string;
}

interface ExperienceUpdateData {
  id: number;
  company?: string;
  position?: string;
  startedAt?: Date;
  endedAt?: Date | null;
  achievements?: string;
}

export interface ExperiencesPatchData {
  create?: ExperienceCreateData[];
  update?: ExperienceUpdateData[];
  delete?: number[];
}

@Injectable()
export class ExperiencesService {
  constructor(private readonly prisma: PrismaService) {}

  async patch(
    profileId: number,
    data: ExperiencesPatchData,
    tx: Prisma.TransactionClient,
  ) {
    for (const item of data.create ?? []) {
      await tx.experience.create({ data: { profileId, ...item } });
    }

    for (const item of data.update ?? []) {
      const { id, ...rest } = item;

      await tx.experience.update({ where: { id }, data: rest });
    }

    for (const id of data.delete ?? []) {
      await tx.experience.delete({ where: { id } });
    }
  }

  findByProfileIds(profileIds: readonly number[]) {
    return this.prisma.experience.findMany({
      where: { profileId: { in: Array.from(profileIds) } },
      orderBy: { startedAt: 'desc' },
    });
  }
}
