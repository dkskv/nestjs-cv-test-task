import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';

interface CreateProjectData {
  name: string;
  profileId: number;
}

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateProjectData) {
    return this.prisma.project.create({ data });
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
