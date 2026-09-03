import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProjectDto {
  @Field(() => Int)
  id!: number;

  @Field()
  name!: string;
}

@InputType()
export class CreateProjectInput {
  @Field()
  name!: string;

  @Field(() => Int)
  profileId!: number;
}
