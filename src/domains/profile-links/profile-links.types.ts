import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateProfileLinkInput {
  @Field()
  name!: string;

  @Field()
  url!: string;

  @Field(() => Int)
  profileId!: number;
}
