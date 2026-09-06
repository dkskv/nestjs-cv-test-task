import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SkillDto {
  @Field(() => Int)
  id!: number;

  @Field()
  name!: string;
}
