import { Module } from '@nestjs/common';
import { ExperienceModule } from '@/domains/experience/experience.module';
import { ProfileLinksModule } from '@/domains/profile-links/profile-links.module';
import { ProjectsModule } from '@/domains/projects/projects.module';
import { SkillsModule } from '@/domains/skills/skills.module';
import { ExperienceLoader } from './loaders/experience.loader';
import { ProfileLinkLoader } from './loaders/profile-link.loader';
import { ProjectsLoader } from './loaders/projects.loader';
import { SkillsLoader } from './loaders/skills.loader';
import { ProfilesResolver } from './profiles.resolver';
import { ProfilesService } from './profiles.service';

@Module({
  imports: [ExperienceModule, ProfileLinksModule, ProjectsModule, SkillsModule],
  providers: [
    ProfilesResolver,
    ProfilesService,
    ExperienceLoader,
    ProfileLinkLoader,
    ProjectsLoader,
    SkillsLoader,
  ],
})
export class ProfilesModule {}
