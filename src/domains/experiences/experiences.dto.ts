import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { GraphQLDate } from 'graphql-scalars';

@ObjectType()
export class ExperienceDto {
  @Field(() => Int)
  id!: number;

  @Field()
  company!: string;

  @Field()
  position!: string;

  @Field(() => GraphQLDate)
  startedAt!: Date;

  @Field(() => GraphQLDate, { nullable: true })
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

  @Field(() => GraphQLDate)
  startedAt!: Date;

  @Field(() => GraphQLDate, { nullable: true })
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

  @Field(() => GraphQLDate, { nullable: true })
  startedAt?: Date;

  @Field(() => GraphQLDate, { nullable: true })
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
