import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateProjectLinkInput } from './project-links.dto';

@Injectable()
export class ProjectLinksService {
  constructor(private readonly prisma: PrismaService) {}

  findByProjectIds(projectIds: readonly number[]) {
    return this.prisma.projectLink.findMany({
      where: { projectId: { in: Array.from(projectIds) } },
    });
  }

  create(input: CreateProjectLinkInput) {
    return this.prisma.projectLink.create({ data: input });
  }

  remove(id: number) {
    return this.prisma.projectLink.delete({ where: { id } });
  }
}
