import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateProfileLinkInput } from './profile-links.dto';

@Injectable()
export class ProfileLinksService {
  constructor(private readonly prisma: PrismaService) {}

  findByProfileIds(profileIds: readonly number[]) {
    return this.prisma.profileLink.findMany({
      where: { profileId: { in: Array.from(profileIds) } },
    });
  }

  create(input: CreateProfileLinkInput) {
    return this.prisma.profileLink.create({ data: input });
  }

  remove(id: number) {
    return this.prisma.profileLink.delete({ where: { id } });
  }
}
