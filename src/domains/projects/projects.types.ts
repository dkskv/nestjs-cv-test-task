import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { LinkDto } from '@/shared/types/link.types';

@ObjectType()
export class ProjectDto {
  @Field(() => Int)
  id!: number;

  @Field()
  name!: string;

  @Field(() => LinkDto, { nullable: true })
  link?: LinkDto | null;
}

@InputType()
export class CreateProjectInput {
  @Field()
  name!: string;

  @Field(() => Int)
  profileId!: number;
}
