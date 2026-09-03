import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateProjectInput } from './projects.types';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  create(input: CreateProjectInput) {
    return this.prisma.project.create({ data: input });
  }

  findAll() {
    return this.prisma.project.findMany();
  }

  findByProfileIds(profileIds: readonly number[]) {
    return this.prisma.project.findMany({
      where: { profileId: { in: Array.from(profileIds) } },
    });
  }

  findOne(id: number) {
    return this.prisma.project.findUniqueOrThrow({ where: { id } });
  }

  remove(id: number) {
    return this.prisma.project.delete({ where: { id } });
  }
}
