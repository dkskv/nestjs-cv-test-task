import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SkillDto {
  @Field(() => Int)
  id!: number;

  @Field()
  name!: string;
}

@InputType()
export class CreateSkillInput {
  @Field()
  name!: string;

  @Field(() => [Int])
  profileIds!: number[];
}
