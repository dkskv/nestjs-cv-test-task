import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ExperienceModule } from '@/domains/experience/experience.module';
import { ProjectsModule } from '@/domains/projects/projects.module';
import { ProfilesModule } from '@/domains/profiles/profiles.module';
import { SkillsModule } from '@/domains/skills/skills.module';
import { PrismaModule } from '@/prisma/prisma.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    PrismaModule,
    ExperienceModule,
    ProjectsModule,
    SkillsModule,
    ProfilesModule,
  ],
})
export class AppModule {}
