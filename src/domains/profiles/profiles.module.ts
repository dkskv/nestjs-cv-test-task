import { Module } from '@nestjs/common';
import { ExperienceModule } from '@/domains/experience/experience.module';
import { ProjectsModule } from '@/domains/projects/projects.module';
import { SkillsModule } from '@/domains/skills/skills.module';
import { ExperienceLoader } from './experience.loader';
import { ProjectsLoader } from './projects.loader';
import { SkillsLoader } from './skills.loader';
import { ProfilesResolver } from './profiles.resolver';
import { ProfilesService } from './profiles.service';

@Module({
  imports: [ExperienceModule, ProjectsModule, SkillsModule],
  providers: [
    ProfilesResolver,
    ProfilesService,
    ExperienceLoader,
    ProjectsLoader,
    SkillsLoader,
  ],
})
export class ProfilesModule {}
