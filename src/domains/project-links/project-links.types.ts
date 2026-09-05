import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateProjectLinkInput {
  @Field()
  name!: string;

  @Field()
  url!: string;

  @Field(() => Int)
  projectId!: number;
}
