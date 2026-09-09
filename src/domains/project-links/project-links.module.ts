import { Module } from '@nestjs/common';
import { ProjectLinksService } from './project-links.service.js';

@Module({
  providers: [ProjectLinksService],
  exports: [ProjectLinksService],
})
export class ProjectLinksModule {}
