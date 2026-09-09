import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class ProfileLinkCreateInput {
  @Field()
  name!: string;

  @Field()
  url!: string;
}

@InputType()
export class ProfileLinkUpdateInput {
  @Field(() => Int)
  id!: number;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  url?: string;
}

@InputType()
export class ProfileLinksPatchInput {
  @Field(() => [ProfileLinkCreateInput], { nullable: true })
  create?: ProfileLinkCreateInput[];

  @Field(() => [ProfileLinkUpdateInput], { nullable: true })
  update?: ProfileLinkUpdateInput[];
}
