import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LinkDto {
  @Field(() => Int)
  id!: number;

  @Field()
  name!: string;

  @Field()
  url!: string;
}
