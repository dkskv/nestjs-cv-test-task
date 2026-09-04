import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateExperienceInput } from './experience.types';

@Injectable()
export class ExperienceService {
  constructor(private readonly prisma: PrismaService) {}

  create(input: CreateExperienceInput) {
    return this.prisma.experience.create({ data: input });
  }

  findAll() {
    return this.prisma.experience.findMany();
  }

  findByProfileIds(profileIds: readonly number[]) {
    return this.prisma.experience.findMany({
      where: { profileId: { in: Array.from(profileIds) } },
    });
  }

  findOne(id: number) {
    return this.prisma.experience.findUniqueOrThrow({ where: { id } });
  }

  remove(id: number) {
    return this.prisma.experience.delete({ where: { id } });
  }
}
