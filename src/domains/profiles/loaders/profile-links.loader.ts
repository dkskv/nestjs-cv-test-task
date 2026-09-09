import DataLoader from 'dataloader';
import { Injectable, Scope } from '@nestjs/common';
import { ProfileLinksService } from '../../profile-links/profile-links.service.js';
import { LinkDto } from '../../../shared/dto/link.dto.js';
import { groupByToMap } from '../../../shared/lib/group-by-to-map.js';

@Injectable({ scope: Scope.REQUEST })
export class ProfileLinksLoader extends DataLoader<number, LinkDto[]> {
  constructor(profileLinksService: ProfileLinksService) {
    super(async (profileIds) => {
      const links = await profileLinksService.findByProfileIds(profileIds);

      const linksByProfileId = groupByToMap(links, (link) => link.profileId);

      return profileIds.map(
        (profileId) => linksByProfileId.get(profileId) ?? [],
      );
    });
  }
}
