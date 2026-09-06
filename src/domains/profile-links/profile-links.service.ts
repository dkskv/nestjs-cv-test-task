import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';

interface CreateProfileLinkData {
  name: string;
  url: string;
  profileId: number;
}

@Injectable()
export class ProfileLinksService {
  constructor(private readonly prisma: PrismaService) {}

  findByProfileIds(profileIds: readonly number[]) {
    return this.prisma.profileLink.findMany({
      where: { profileId: { in: Array.from(profileIds) } },
    });
  }

  create(data: CreateProfileLinkData) {
    return this.prisma.profileLink.create({ data });
  }

  remove(id: number) {
    return this.prisma.profileLink.delete({ where: { id } });
  }
}
