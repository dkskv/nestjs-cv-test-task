import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ExperienceDto {
  @Field(() => Int)
  id!: number;

  @Field()
  company!: string;

  @Field()
  position!: string;
}

@InputType()
export class CreateExperienceInput {
  @Field()
  company!: string;

  @Field()
  position!: string;

  @Field(() => Int)
  profileId!: number;
}
