import { Injectable } from '@nestjs/common';
import {
  ExperiencesPatchData,
  ExperiencesService,
} from './../experiences/experiences.service.js';
import {
  ProjectsPatchData,
  ProjectsService,
} from './../projects/projects.service.js';
import { SkillsPatchData, SkillsService } from './../skills/skills.service.js';
import {
  ProfileLinksPatchData,
  ProfileLinksService,
} from '../profile-links/profile-links.service.js';
import { PrismaService } from '../../prisma/prisma.service.js';

interface ProfileCreateData {
  name: string;
}

interface ProfileUpdateData {
  name?: string;
  description?: string;
  links?: ProfileLinksPatchData;
  projects?: ProjectsPatchData;
  experiences?: ExperiencesPatchData;
  skills?: SkillsPatchData;
}

@Injectable()
export class ProfilesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly profileLinksService: ProfileLinksService,
    private readonly projectsService: ProjectsService,
    private readonly experiencesService: ExperiencesService,
    private readonly skillsService: SkillsService,
  ) {}

  create(data: ProfileCreateData) {
    return this.prisma.profile.create({ data });
  }

  async update(id: number, data: ProfileUpdateData) {
    return this.prisma.$transaction(async (tx) => {
      const { name, links, description, projects, experiences, skills } = data;

      await tx.profile.update({
        where: { id },
        data: { name, description },
      });

      if (links) {
        await this.profileLinksService.patch(id, links, tx);
      }

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
