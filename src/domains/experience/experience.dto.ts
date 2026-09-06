import {
  Field,
  GraphQLISODateTime,
  InputType,
  Int,
  ObjectType,
} from '@nestjs/graphql';

@ObjectType()
export class ExperienceDto {
  @Field(() => Int)
  id!: number;

  @Field()
  company!: string;

  @Field()
  position!: string;

  @Field(() => GraphQLISODateTime)
  startedAt!: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  endedAt!: Date | null;

  @Field()
  achievements!: string;
}

@InputType()
export class CreateExperienceInput {
  @Field()
  company!: string;

  @Field()
  position!: string;

  @Field(() => GraphQLISODateTime)
  startedAt!: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  endedAt?: Date | null;

  @Field({ nullable: true })
  achievements?: string;

  @Field(() => Int)
  profileId!: number;
}
