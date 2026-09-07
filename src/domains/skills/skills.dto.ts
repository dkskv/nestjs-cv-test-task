import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SkillDto {
  @Field(() => Int)
  id!: number;

  @Field()
  name!: string;
}

@InputType()
export class SkillsPatchInput {
  @Field(() => [String], { nullable: true })
  create?: string[];

  @Field(() => [String], { nullable: true })
  delete?: string[];
}
