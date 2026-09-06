import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateSkillInput } from './skills.dto';

@Injectable()
export class SkillsService {
  constructor(private readonly prisma: PrismaService) {}

  create({ name, profileIds }: CreateSkillInput) {
    return this.prisma.skill.create({
      data: {
        name,
        profiles: {
          connect: profileIds.map((id) => ({ id })),
        },
      },
    });
  }

  findAll() {
    return this.prisma.skill.findMany();
  }

  findByProfileIds(profileIds: readonly number[]) {
    return this.prisma.skill.findMany({
      where: {
        profiles: {
          some: { id: { in: Array.from(profileIds) } },
        },
      },
      include: {
        profiles: {
          select: { id: true },
        },
      },
    });
  }

  findOne(id: number) {
    return this.prisma.skill.findUniqueOrThrow({ where: { id } });
  }

  remove(id: number) {
    return this.prisma.skill.delete({ where: { id } });
  }
}
