import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { ProjectDto } from '@/domains/projects/projects.types';

@ObjectType()
export class ProfileDto {
  @Field(() => Int)
  id!: number;

  @Field()
  name!: string;

  @Field()
  description!: string;

  @Field(() => [ProjectDto])
  projects!: ProjectDto[];
}

@InputType()
export class CreateProfileInput {
  @Field()
  name!: string;

  @Field()
  description!: string;
}
