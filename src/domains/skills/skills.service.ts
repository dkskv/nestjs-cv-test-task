import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/generated/client';
import { PrismaService } from '@/prisma/prisma.service';

export interface SkillsPatchData {
  create?: string[];
  delete?: string[];
}

@Injectable()
export class SkillsService {
  constructor(private readonly prisma: PrismaService) {}

  async patchForProfile(
    profileId: number,
    patch: SkillsPatchData,
    tx: Prisma.TransactionClient,
  ) {
    const createNames = [...new Set(patch.create ?? [])];
    const deleteNames = [...new Set(patch.delete ?? [])];

    if (createNames.length > 0) {
      await tx.profile.update({
        where: { id: profileId },
        data: {
          skills: {
            connectOrCreate: createNames.map((name) => ({
              where: { name },
              create: { name },
            })),
          },
        },
      });
    }

    if (deleteNames.length > 0) {
      await tx.profile.update({
        where: { id: profileId },
        data: {
          skills: {
            disconnect: deleteNames.map((name) => ({ name })),
          },
        },
      });
    }
  }

  findByProfileIds(profileIds: readonly number[]) {
    return this.prisma.skill.findMany({
      where: {
        profiles: { some: { id: { in: Array.from(profileIds) } } },
      },
      include: {
        profiles: {
          select: { id: true },
        },
      },
    });
  }
}
