import { Module } from '@nestjs/common';
import { ExperienceModule } from '@/domains/experience/experience.module';
import { ProjectsModule } from '@/domains/projects/projects.module';
import { ExperienceLoader } from './experience.loader';
import { ProjectsLoader } from './projects.loader';
import { ProfilesResolver } from './profiles.resolver';
import { ProfilesService } from './profiles.service';

@Module({
  imports: [ExperienceModule, ProjectsModule],
  providers: [
    ProfilesResolver,
    ProfilesService,
    ExperienceLoader,
    ProjectsLoader,
  ],
})
export class ProfilesModule {}
