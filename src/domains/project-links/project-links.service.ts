import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';

interface CreateProjectLinkData {
  name: string;
  url: string;
  projectId: number;
}

@Injectable()
export class ProjectLinksService {
  constructor(private readonly prisma: PrismaService) {}

  findByProjectIds(projectIds: readonly number[]) {
    return this.prisma.projectLink.findMany({
      where: { projectId: { in: Array.from(projectIds) } },
    });
  }

  create(data: CreateProjectLinkData) {
    return this.prisma.projectLink.create({ data });
  }

  remove(id: number) {
    return this.prisma.projectLink.delete({ where: { id } });
  }
}
