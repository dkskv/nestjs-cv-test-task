import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/generated/client';
import { PrismaService } from '@/prisma/prisma.service';

export interface ProjectLinkCreateData {
  name: string;
  url: string;
}

interface ProjectLinkUpdateData {
  name?: string;
  url?: string;
}

export type ProjectLinkPatchData =
  { create: ProjectLinkCreateData } | { update: ProjectLinkUpdateData } | null;

@Injectable()
export class ProjectLinksService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    projectId: number,
    data: ProjectLinkCreateData,
    tx: Prisma.TransactionClient,
  ) {
    await tx.projectLink.create({ data: { projectId, ...data } });
  }

  async patch(
    projectId: number,
    data: ProjectLinkPatchData,
    tx: Prisma.TransactionClient,
  ) {
    if (data === null) {
      await tx.projectLink.delete({ where: { projectId } });

      return;
    }

    if ('create' in data) {
      await this.create(projectId, data.create, tx);

      return;
    }

    if ('update' in data) {
      await tx.projectLink.update({ where: { projectId }, data: data.update });
    }
  }

  findByProjectIds(projectIds: readonly number[]) {
    return this.prisma.projectLink.findMany({
      where: { projectId: { in: Array.from(projectIds) } },
    });
  }
}
