import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ProjectLinkCreateInput {
  @Field()
  name!: string;

  @Field()
  url!: string;
}

@InputType()
export class ProjectLinkUpdateInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  url?: string;
}

@InputType({ isOneOf: true })
export class ProjectLinkPatchInput {
  @Field(() => ProjectLinkCreateInput, { nullable: true })
  create!: ProjectLinkCreateInput;

  @Field(() => ProjectLinkUpdateInput, { nullable: true })
  update!: ProjectLinkUpdateInput;
}
