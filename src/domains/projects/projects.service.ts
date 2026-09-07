import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import {
  ProjectLinkCreateData,
  ProjectLinkPatchData,
  ProjectLinksService,
} from '@/domains/project-links/project-links.service';
import { PrismaService } from '@/prisma/prisma.service';

export interface ProjectCreateData {
  name: string;
  link?: ProjectLinkCreateData | null;
}

export interface ProjectUpdateData {
  id: number;
  name?: string;
  link?: ProjectLinkPatchData | null;
}

export interface ProjectsPatchData {
  create?: ProjectCreateData[];
  update?: ProjectUpdateData[];
  delete?: number[];
}

@Injectable()
export class ProjectsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly projectLinksService: ProjectLinksService,
  ) {}

  private async create(
    profileId: number,
    data: ProjectCreateData,
    tx: Prisma.TransactionClient,
  ) {
    const { link, ...rest } = data;
    const project = await tx.project.create({ data: { profileId, ...rest } });

    if (link) {
      await this.projectLinksService.create(project.id, link, tx);
    }
  }

  private async update(data: ProjectUpdateData, tx: Prisma.TransactionClient) {
    const { id, link, ...rest } = data;
    await tx.project.update({ where: { id }, data: rest });

    if (link !== undefined) {
      await this.projectLinksService.patch(id, link, tx);
    }
  }

  async patch(
    profileId: number,
    patch: ProjectsPatchData,
    tx: Prisma.TransactionClient,
  ) {
    for (const project of patch.create ?? []) {
      await this.create(profileId, project, tx);
    }

    for (const project of patch.update ?? []) {
      await this.update(project, tx);
    }

    for (const id of patch.delete ?? []) {
      await tx.project.delete({ where: { id } });
    }
  }

  findByProfileIds(profileIds: readonly number[]) {
    return this.prisma.project.findMany({
      where: { profileId: { in: Array.from(profileIds) } },
    });
  }
}
