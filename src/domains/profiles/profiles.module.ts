import { Module } from '@nestjs/common';
import { ExperiencesModule } from './../experiences/experiences.module.js';
import { ProfileLinksModule } from './../profile-links/profile-links.module.js';
import { ProjectsModule } from './../projects/projects.module.js';
import { SkillsModule } from './../skills/skills.module.js';
import { ExperiencesLoader } from './loaders/experiences.loader.js';
import { ProfileLinksLoader } from './loaders/profile-links.loader.js';
import { ProjectsLoader } from './loaders/projects.loader.js';
import { SkillsLoader } from './loaders/skills.loader.js';
import { ProfilesResolver } from './profiles.resolver.js';
import { ProfilesService } from './profiles.service.js';

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
