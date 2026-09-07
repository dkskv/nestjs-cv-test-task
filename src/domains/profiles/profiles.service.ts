import { Injectable } from '@nestjs/common';
import {
  ExperiencesPatchData,
  ExperiencesService,
} from '@/domains/experiences/experiences.service';
import {
  ProjectsPatchData,
  ProjectsService,
} from '@/domains/projects/projects.service';
import {
  SkillsPatchData,
  SkillsService,
} from '@/domains/skills/skills.service';
import { PrismaService } from '@/prisma/prisma.service';

interface ProfileCreateData {
  name: string;
}

interface ProfileUpdateData {
  name?: string;
  description?: string;
  projects?: ProjectsPatchData;
  experiences?: ExperiencesPatchData;
  skills?: SkillsPatchData;
}

@Injectable()
export class ProfilesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly projectsService: ProjectsService,
    private readonly experiencesService: ExperiencesService,
    private readonly skillsService: SkillsService,
  ) {}

  create(data: ProfileCreateData) {
    return this.prisma.profile.create({ data });
  }

  async update(id: number, data: ProfileUpdateData) {
    return this.prisma.$transaction(async (tx) => {
      const { name, description, projects, experiences, skills } = data;

      await tx.profile.update({
        where: { id },
        data: { name, description },
      });

      if (projects) {
        await this.projectsService.patch(id, projects, tx);
      }

      if (experiences) {
        await this.experiencesService.patch(id, experiences, tx);
      }

      if (skills) {
        await this.skillsService.patchForProfile(id, skills, tx);
      }
    });
  }

  delete(id: number) {
    return this.prisma.profile.delete({ where: { id } });
  }

  findAll() {
    return this.prisma.profile.findMany();
  }

  findOne(id: number) {
    return this.prisma.profile.findUniqueOrThrow({ where: { id } });
  }
}
