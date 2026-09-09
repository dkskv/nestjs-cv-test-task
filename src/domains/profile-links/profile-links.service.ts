import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import { Prisma } from '../../../prisma/generated/client.js';

interface ProfileLinkCreateData {
  name: string;
  url: string;
}

interface ProfileLinkUpdateData {
  id: number;
  name?: string;
  url?: string;
}

export interface ProfileLinksPatchData {
  create?: ProfileLinkCreateData[];
  update?: ProfileLinkUpdateData[];
  delete?: number[];
}

@Injectable()
export class ProfileLinksService {
  constructor(private readonly prisma: PrismaService) {}

  async patch(
    profileId: number,
    data: ProfileLinksPatchData,
    tx: Prisma.TransactionClient,
  ) {
    for (const item of data.create ?? []) {
      await tx.profileLink.create({ data: { profileId, ...item } });
    }

    for (const item of data.update ?? []) {
      const { id, ...rest } = item;

      await tx.profileLink.update({ where: { id }, data: rest });
    }

    for (const id of data.delete ?? []) {
      await tx.profileLink.delete({ where: { id } });
    }
  }

  findByProfileIds(profileIds: readonly number[]) {
    return this.prisma.profileLink.findMany({
      where: { profileId: { in: Array.from(profileIds) } },
    });
  }
}
