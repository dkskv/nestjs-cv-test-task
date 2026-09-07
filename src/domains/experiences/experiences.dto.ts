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
export class ExperienceCreateInput {
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
}

@InputType()
export class ExperienceUpdateInput {
  @Field(() => Int)
  id!: number;

  @Field({ nullable: true })
  company?: string;

  @Field({ nullable: true })
  position?: string;

  @Field(() => GraphQLISODateTime, { nullable: true })
  startedAt?: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  endedAt?: Date | null;

  @Field({ nullable: true })
  achievements?: string;
}

@InputType()
export class ExperiencesPatchInput {
  @Field(() => [ExperienceCreateInput], { nullable: true })
  create?: ExperienceCreateInput[];

  @Field(() => [ExperienceUpdateInput], { nullable: true })
  update?: ExperienceUpdateInput[];

  @Field(() => [Int], { nullable: true })
  delete?: number[];
}
