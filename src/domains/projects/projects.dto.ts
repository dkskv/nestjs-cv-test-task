import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import {
  ProjectLinkCreateInput,
  ProjectLinkPatchInput,
} from '@/domains/project-links/project-links.dto';
import { LinkDto } from '@/shared/dto/link.dto';

@ObjectType()
export class ProjectDto {
  @Field(() => Int)
  id!: number;

  @Field()
  name!: string;

  @Field(() => LinkDto, { nullable: true })
  link?: LinkDto | null;
}

@InputType()
export class ProjectCreateInput {
  @Field()
  name!: string;

  @Field(() => ProjectLinkCreateInput, { nullable: true })
  link?: ProjectLinkCreateInput | null;
}

@InputType()
export class ProjectUpdateInput {
  @Field(() => Int)
  id!: number;

  @Field({ nullable: true })
  name?: string;

  @Field(() => ProjectLinkPatchInput, { nullable: true })
  link?: ProjectLinkPatchInput | null;
}

@InputType()
export class ProjectsPatchInput {
  @Field(() => [ProjectCreateInput], { nullable: true })
  create?: ProjectCreateInput[];

  @Field(() => [ProjectUpdateInput], { nullable: true })
  update?: ProjectUpdateInput[];

  @Field(() => [Int], { nullable: true })
  delete?: number[];
}
