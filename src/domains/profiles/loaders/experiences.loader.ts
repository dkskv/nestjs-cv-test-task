import DataLoader from 'dataloader';
import { Injectable, Scope } from '@nestjs/common';
import { ExperienceDto } from '@/domains/experiences/experiences.dto';
import { ExperiencesService } from '@/domains/experiences/experiences.service';
import { groupByToMap } from '@/shared/lib/group-by-to-map';

@Injectable({ scope: Scope.REQUEST })
export class ExperiencesLoader extends DataLoader<number, ExperienceDto[]> {
  constructor(experiencesService: ExperiencesService) {
    super(async (profileIds) => {
      const experience = await experiencesService.findByProfileIds(profileIds);

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
