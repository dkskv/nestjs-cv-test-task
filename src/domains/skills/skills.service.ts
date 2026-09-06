import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class SkillsService {
  constructor(private readonly prisma: PrismaService) {}

  async replaceProfileSkills(profileId: number, names: string[]) {
    const uniqueNames = [...new Set(names)];

    return this.prisma.$transaction(async (tx) => {
      const skills = await Promise.all(
        uniqueNames.map((name) =>
          tx.skill.upsert({
            where: { name },
            create: { name },
            update: {},
          }),
        ),
      );

      const profile = await tx.profile.update({
        where: { id: profileId },
        data: { skills: { set: skills.map(({ id }) => ({ id })) } },
        include: { skills: true },
      });

      return profile.skills;
    });
  }

  findAll() {
    return this.prisma.skill.findMany();
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

  findOne(id: number) {
    return this.prisma.skill.findUniqueOrThrow({ where: { id } });
  }

  remove(id: number) {
    return this.prisma.skill.delete({ where: { id } });
  }
}
