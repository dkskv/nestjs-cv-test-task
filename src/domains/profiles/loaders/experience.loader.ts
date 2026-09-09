import DataLoader from 'dataloader';
import { Injectable, Scope } from '@nestjs/common';
import { ExperienceDto } from '@/domains/experience/experience.types';
import { ExperienceService } from '@/domains/experience/experience.service';
import { groupByToMap } from '@/shared/lib/group-by-to-map';

@Injectable({ scope: Scope.REQUEST })
export class ExperienceLoader extends DataLoader<number, ExperienceDto[]> {
  constructor(experienceService: ExperienceService) {
    super(async (profileIds) => {
      const experience = await experienceService.findByProfileIds(profileIds);

      const experienceByProfileId = groupByToMap(
        experience,
        (experience) => experience.profileId,
      );

      return profileIds.map(
        (profileId) => experienceByProfileId.get(profileId) ?? [],
      );
    });
  }
}
