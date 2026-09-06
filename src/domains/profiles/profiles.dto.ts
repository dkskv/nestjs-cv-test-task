import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { ExperienceDto } from '@/domains/experience/experience.dto';
import { ProjectDto } from '@/domains/projects/projects.dto';
import { SkillDto } from '@/domains/skills/skills.dto';
import { LinkDto } from '@/shared/dto/link.dto';

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
