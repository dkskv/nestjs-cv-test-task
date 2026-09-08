import { Module } from '@nestjs/common';
import { ExperiencesModule } from '@/domains/experiences/experiences.module';
import { ProfileLinksModule } from '@/domains/profile-links/profile-links.module';
import { ProjectsModule } from '@/domains/projects/projects.module';
import { SkillsModule } from '@/domains/skills/skills.module';
import { ExperiencesLoader } from './loaders/experiences.loader';
import { ProfileLinksLoader } from './loaders/profile-links.loader';
import { ProjectsLoader } from './loaders/projects.loader';
import { SkillsLoader } from './loaders/skills.loader';
import { ProfilesResolver } from './profiles.resolver';
import { ProfilesService } from './profiles.service';

@Module({
  imports: [
    ExperiencesModule,
    ProfileLinksModule,
    ProjectsModule,
    SkillsModule,
  ],
  providers: [
    ProfilesResolver,
    ProfilesService,
    ExperiencesLoader,
    ProfileLinksLoader,
    ProjectsLoader,
    SkillsLoader,
  ],
})
export class ProfilesModule {}
