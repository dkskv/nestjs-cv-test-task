import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateExperienceInput } from './experience.dto';

@Injectable()
export class ExperienceService {
  constructor(private readonly prisma: PrismaService) {}

  create(input: CreateExperienceInput) {
    return this.prisma.experience.create({ data: input });
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
