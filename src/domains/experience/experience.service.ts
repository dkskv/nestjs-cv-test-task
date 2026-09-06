import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';

interface CreateExperienceData {
  company: string;
  position: string;
  startedAt: Date;
  endedAt?: Date | null;
  achievements?: string;
  profileId: number;
}

@Injectable()
export class ExperienceService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateExperienceData) {
    return this.prisma.experience.create({ data });
  }

  findAll() {
    return this.prisma.experience.findMany({
      orderBy: { startedAt: 'desc' },
    });
  }

  findByProfileIds(profileIds: readonly number[]) {
    return this.prisma.experience.findMany({
      where: { profileId: { in: Array.from(profileIds) } },
      orderBy: { startedAt: 'desc' },
    });
  }

  findOne(id: number) {
    return this.prisma.experience.findUniqueOrThrow({ where: { id } });
  }

  remove(id: number) {
    return this.prisma.experience.delete({ where: { id } });
  }
}
