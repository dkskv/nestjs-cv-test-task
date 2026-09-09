import DataLoader from 'dataloader';
import { Injectable, Scope } from '@nestjs/common';
import { ExperienceDto } from '../../experiences/experiences.dto.js';
import { ExperiencesService } from '../../experiences/experiences.service.js';
import { groupByToMap } from '../../../shared/lib/group-by-to-map.js';

@Injectable({ scope: Scope.REQUEST })
export class ExperiencesLoader extends DataLoader<number, ExperienceDto[]> {
  constructor(experiencesService: ExperiencesService) {
    super(async (profileIds) => {
      const experiences = await experiencesService.findByProfileIds(profileIds);

      const experienceByProfileId = groupByToMap(
        experiences,
        (experience) => experience.profileId,
      );

      return profileIds.map(
        (profileId) => experienceByProfileId.get(profileId) ?? [],
      );
    });
  }
}
