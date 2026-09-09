import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import {
  ExperienceDto,
  ExperiencesPatchInput,
} from './../experiences/experiences.dto.js';
import { ProjectDto, ProjectsPatchInput } from './../projects/projects.dto.js';
import { SkillDto, SkillsPatchInput } from './../skills/skills.dto.js';
import { LinkDto } from '../../shared/dto/link.dto.js';
import { ProfileLinksPatchInput } from '../profile-links/profile-links.dto.js';

@ObjectType()
export class ProfileDto {
  @Field(() => Int)
  id!: number;

  @Field()
  name!: string;

  @Field()
  description!: string;

  @Field(() => [LinkDto])
  links!: LinkDto[];

  @Field(() => [ProjectDto])
  projects!: ProjectDto[];

  @Field(() => [ExperienceDto])
  experiences!: ExperienceDto[];

  @Field(() => [SkillDto])
  skills!: SkillDto[];
}

@InputType()
export class ProfileCreateInput {
  @Field()
  name!: string;
}

@InputType()
export class ProfileUpdateInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => ProfileLinksPatchInput, { nullable: true })
  links?: ProfileLinksPatchInput;

  @Field(() => ProjectsPatchInput, { nullable: true })
  projects?: ProjectsPatchInput;

  @Field(() => ExperiencesPatchInput, { nullable: true })
  experiences?: ExperiencesPatchInput;

  @Field(() => SkillsPatchInput, { nullable: true })
  skills?: SkillsPatchInput;
}
