import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import {
  ExperienceDto,
  ExperiencesPatchInput,
} from '@/domains/experiences/experiences.dto';
import {
  ProjectDto,
  ProjectsPatchInput,
} from '@/domains/projects/projects.dto';
import { SkillDto, SkillsPatchInput } from '@/domains/skills/skills.dto';
import { LinkDto } from '@/shared/dto/link.dto';
import { ProfileLinksPatchInput } from '../profile-links/profile-links.dto';

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
