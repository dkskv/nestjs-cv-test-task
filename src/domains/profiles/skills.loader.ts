import DataLoader from 'dataloader';
import { Injectable, Scope } from '@nestjs/common';
import { SkillDto } from '@/domains/skills/skills.types';
import { SkillsService } from '@/domains/skills/skills.service';

@Injectable({ scope: Scope.REQUEST })
export class SkillsLoader extends DataLoader<number, SkillDto[]> {
  constructor(skillsService: SkillsService) {
    super(async (profileIds) => {
      const skills = await skillsService.findByProfileIds(profileIds);
      const skillsByProfileId = new Map<number, SkillDto[]>();

      for (const skill of skills) {
        for (const profile of skill.profiles) {
          const profileSkills = skillsByProfileId.get(profile.id) ?? [];
          profileSkills.push(skill);
          skillsByProfileId.set(profile.id, profileSkills);
        }
      }

      return profileIds.map(
        (profileId) => skillsByProfileId.get(profileId) ?? [],
      );
    });
  }
}
