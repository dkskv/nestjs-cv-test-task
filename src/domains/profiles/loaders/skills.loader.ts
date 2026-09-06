import DataLoader from 'dataloader';
import { Injectable, Scope } from '@nestjs/common';
import { SkillDto } from '@/domains/skills/skills.dto';
import { SkillsService } from '@/domains/skills/skills.service';
import { groupByManyToMap } from '@/shared/lib/group-by-many-to-map';

@Injectable({ scope: Scope.REQUEST })
export class SkillsLoader extends DataLoader<number, SkillDto[]> {
  constructor(skillsService: SkillsService) {
    super(async (profileIds) => {
      const skills = await skillsService.findByProfileIds(profileIds);

      const skillsByProfileId = groupByManyToMap(skills, function* (skill) {
        for (const profile of skill.profiles) {
          yield profile.id;
        }
      });

      return profileIds.map(
        (profileId) => skillsByProfileId.get(profileId) ?? [],
      );
    });
  }
}
