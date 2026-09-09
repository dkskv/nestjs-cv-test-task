import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ExperiencesModule } from './domains/experiences/experiences.module.js';
import { ProjectsModule } from './domains/projects/projects.module.js';
import { ProfilesModule } from './domains/profiles/profiles.module.js';
import { SkillsModule } from './domains/skills/skills.module.js';
import { PrismaModule } from './prisma/prisma.module.js';
import 'dotenv/config';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      graphiql: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    PrismaModule,
    ExperiencesModule,
    ProjectsModule,
    SkillsModule,
    ProfilesModule,
  ],
})
export class AppModule {}
