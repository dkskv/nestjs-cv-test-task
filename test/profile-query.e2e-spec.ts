/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module.js';
import { PrismaService } from '../src/prisma/prisma.service.js';
import { cleanDatabase } from './utils/clean-database';

describe('Profile query (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let profileId: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    prisma = app.get(PrismaService);

    await cleanDatabase(prisma);

    const skill = await prisma.skill.create({
      data: {
        name: 'NestJS',
      },
    });

    const profile = await prisma.profile.create({
      data: {
        name: 'Test Profile',
        description: 'Test description',
        skills: {
          connect: {
            id: skill.id,
          },
        },
        links: {
          create: {
            name: 'GitHub',
            url: 'https://github.com/test',
          },
        },
        experiences: {
          create: {
            company: 'Test Company',
            position: 'Backend Developer',
            startedAt: new Date('2022-01-01'),
            endedAt: new Date('2024-01-01'),
            achievements: 'Built backend services',
          },
        },
        projects: {
          create: {
            name: 'Test Project',
            link: {
              create: {
                name: 'Repository',
                url: 'https://github.com/test/project',
              },
            },
          },
        },
      },
    });

    profileId = profile.id;
  });

  afterAll(async () => {
    await cleanDatabase(prisma);
    await app.close();
  });

  it('returns profile with nested data', async () => {
    const query = `
      query {
        profile(id: ${profileId}) {
          id
          name
          description

          skills {
            id
            name
          }

          links {
            id
            name
            url
          }

          experiences {
            id
            company
            position
            startedAt
            endedAt
            achievements
          }

          projects {
            id
            name
            link {
              id
              name
              url
            }
          }
        }
      }
    `;

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query })
      .expect(200);

    expect(response.body.errors).toBeUndefined();

    expect(response.body.data.profile).toEqual({
      id: profileId,
      name: 'Test Profile',
      description: 'Test description',

      skills: [
        {
          id: expect.any(Number),
          name: 'NestJS',
        },
      ],

      links: [
        {
          id: expect.any(Number),
          name: 'GitHub',
          url: 'https://github.com/test',
        },
      ],

      experiences: [
        {
          id: expect.any(Number),
          company: 'Test Company',
          position: 'Backend Developer',
          startedAt: '2022-01-01',
          endedAt: '2024-01-01',
          achievements: 'Built backend services',
        },
      ],

      projects: [
        {
          id: expect.any(Number),
          name: 'Test Project',
          link: {
            id: expect.any(Number),
            name: 'Repository',
            url: 'https://github.com/test/project',
          },
        },
      ],
    });
  });
});
