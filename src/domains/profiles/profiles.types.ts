import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { ExperienceDto } from '@/domains/experience/experience.types';
import { ProjectDto } from '@/domains/projects/projects.types';
import { SkillDto } from '@/domains/skills/skills.types';
import { LinkDto } from '@/shared/types/link.types';

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
  experience!: ExperienceDto[];

  @Field(() => [SkillDto])
  skills!: SkillDto[];
}

@InputType()
export class CreateProfileInput {
  @Field()
  name!: string;

  @Field()
  description!: string;
}
