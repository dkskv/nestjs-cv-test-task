/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module.js';
import { PrismaService } from '../src/prisma/prisma.service.js';
import { cleanDatabase } from './utils/clean-database';

describe('Profile mutations (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();

    prisma = app.get(PrismaService);
  });

  beforeEach(async () => {
    await cleanDatabase(prisma);
  });

  afterAll(async () => {
    await cleanDatabase(prisma);
    await app.close();
  });

  async function graphqlRequest<T = unknown>(
    query: string,
    variables?: Record<string, unknown>,
  ): Promise<T> {
    const response = await request(app.getHttpServer()).post('/graphql').send({
      query,
      variables,
    });

    expect(response.body.errors).toBeUndefined();
    expect(response.statusCode).toBe(200);

    return response.body.data as T;
  }

  async function updateProfile<T = unknown>(
    id: number,
    input: Record<string, unknown>,
    selectionSet: string,
  ): Promise<T> {
    const mutation = `
      mutation UpdateProfile($id: Int!, $input: ProfileUpdateInput!) {
        updateProfile(id: $id, input: $input) {
          ${selectionSet}
        }
      }
    `;

    const data = await graphqlRequest<{ updateProfile: T }>(mutation, {
      id,
      input,
    });

    return data.updateProfile;
  }

  describe('createProfile', () => {
    it('creates profile', async () => {
      const mutation = `
        mutation CreateProfile($input: ProfileCreateInput!) {
          createProfile(input: $input) {
            id
            name
            description
          }
        }
      `;

      const data = await graphqlRequest<{
        createProfile: {
          id: number;
          name: string;
          description: string;
        };
      }>(mutation, {
        input: {
          name: 'Test Profile',
        },
      });

      expect(data.createProfile).toEqual({
        id: expect.any(Number),
        name: 'Test Profile',
        description: '',
      });
    });
  });

  describe('updateProfile', () => {
    describe('profile fields', () => {
      it('updates profile name', async () => {
        const profile = await prisma.profile.create({
          data: {
            name: 'Initial Profile',
            description: 'Initial description',
          },
        });

        const result = await updateProfile<{
          id: number;
          name: string;
          description: string;
        }>(
          profile.id,
          {
            name: 'Updated Profile',
          },
          `
            id
            name
            description
          `,
        );

        expect(result).toEqual({
          id: profile.id,
          name: 'Updated Profile',
          description: 'Initial description',
        });
      });

      it('updates profile description', async () => {
        const profile = await prisma.profile.create({
          data: {
            name: 'Initial Profile',
            description: 'Initial description',
          },
        });

        const result = await updateProfile<{
          id: number;
          name: string;
          description: string;
        }>(
          profile.id,
          {
            description: 'Updated description',
          },
          `
            id
            name
            description
          `,
        );

        expect(result).toEqual({
          id: profile.id,
          name: 'Initial Profile',
          description: 'Updated description',
        });
      });
    });

    describe('skills', () => {
      it('adds skill', async () => {
        const profile = await prisma.profile.create({
          data: {
            name: 'Test Profile',
          },
        });

        const result = await updateProfile<{
          id: number;
          skills: Array<{
            id: number;
            name: string;
          }>;
        }>(
          profile.id,
          {
            skills: {
              create: ['TypeScript'],
            },
          },
          `
            id
            skills {
              id
              name
            }
          `,
        );

        expect(result).toEqual({
          id: profile.id,
          skills: [
            {
              id: expect.any(Number),
              name: 'TypeScript',
            },
          ],
        });
      });

      it('removes skill', async () => {
        const skill = await prisma.skill.create({
          data: {
            name: 'NestJS',
          },
        });

        const profile = await prisma.profile.create({
          data: {
            name: 'Test Profile',
            skills: {
              connect: {
                id: skill.id,
              },
            },
          },
        });

        const result = await updateProfile<{
          id: number;
          skills: Array<{
            id: number;
            name: string;
          }>;
        }>(
          profile.id,
          {
            skills: {
              delete: ['NestJS'],
            },
          },
          `
            id
            skills {
              id
              name
            }
          `,
        );

        expect(result).toEqual({
          id: profile.id,
          skills: [],
        });
      });
    });

    describe('links', () => {
      it('creates link', async () => {
        const profile = await prisma.profile.create({
          data: {
            name: 'Test Profile',
          },
        });

        const result = await updateProfile<{
          id: number;
          links: Array<{
            id: number;
            name: string;
            url: string;
          }>;
        }>(
          profile.id,
          {
            links: {
              create: [
                {
                  name: 'GitHub',
                  url: 'https://github.com/test',
                },
              ],
            },
          },
          `
            id
            links {
              id
              name
              url
            }
          `,
        );

        expect(result).toEqual({
          id: profile.id,
          links: [
            {
              id: expect.any(Number),
              name: 'GitHub',
              url: 'https://github.com/test',
            },
          ],
        });
      });

      it('updates link', async () => {
        const profile = await prisma.profile.create({
          data: {
            name: 'Test Profile',
            links: {
              create: [
                {
                  name: 'GitHub',
                  url: 'https://github.com/initial',
                },
              ],
            },
          },
          include: {
            links: true,
          },
        });

        const link = profile.links[0];

        const result = await updateProfile<{
          id: number;
          links: Array<{
            id: number;
            name: string;
            url: string;
          }>;
        }>(
          profile.id,
          {
            links: {
              update: [
                {
                  id: link.id,
                  name: 'GitHub',
                  url: 'https://github.com/updated',
                },
              ],
            },
          },
          `
            id
            links {
              id
              name
              url
            }
          `,
        );

        expect(result).toEqual({
          id: profile.id,
          links: [
            {
              id: link.id,
              name: 'GitHub',
              url: 'https://github.com/updated',
            },
          ],
        });
      });
    });

    describe('experiences', () => {
      it('creates experience', async () => {
        const profile = await prisma.profile.create({
          data: {
            name: 'Test Profile',
          },
        });

        const result = await updateProfile<{
          id: number;
          experiences: Array<{
            id: number;
            company: string;
            position: string;
            startedAt: string;
            endedAt: string | null;
            achievements: string;
          }>;
        }>(
          profile.id,
          {
            experiences: {
              create: [
                {
                  company: 'New Company',
                  position: 'Senior Backend Developer',
                  startedAt: '2024-01-01',
                  achievements: 'Built new services',
                },
              ],
            },
          },
          `
            id
            experiences {
              id
              company
              position
              startedAt
              endedAt
              achievements
            }
          `,
        );

        expect(result).toEqual({
          id: profile.id,
          experiences: [
            {
              id: expect.any(Number),
              company: 'New Company',
              position: 'Senior Backend Developer',
              startedAt: '2024-01-01',
              endedAt: null,
              achievements: 'Built new services',
            },
          ],
        });
      });

      it('updates experience', async () => {
        const profile = await prisma.profile.create({
          data: {
            name: 'Test Profile',
          },
        });

        const experience = await prisma.experience.create({
          data: {
            profileId: profile.id,
            company: 'Old Company',
            position: 'Backend Developer',
            startedAt: new Date('2022-01-01'),
            endedAt: new Date('2023-01-01'),
            achievements: 'Initial achievements',
          },
        });

        const result = await updateProfile<{
          id: number;
          experiences: Array<{
            id: number;
            company: string;
            position: string;
            startedAt: string;
            endedAt: string | null;
            achievements: string;
          }>;
        }>(
          profile.id,
          {
            experiences: {
              update: [
                {
                  id: experience.id,
                  position: 'Senior Backend Developer',
                  achievements: 'Updated achievements',
                },
              ],
            },
          },
          `
            id
            experiences {
              id
              company
              position
              startedAt
              endedAt
              achievements
            }
          `,
        );

        expect(result).toEqual({
          id: profile.id,
          experiences: [
            {
              id: experience.id,
              company: 'Old Company',
              position: 'Senior Backend Developer',
              startedAt: '2022-01-01',
              endedAt: '2023-01-01',
              achievements: 'Updated achievements',
            },
          ],
        });
      });

      it('deletes experience', async () => {
        const profile = await prisma.profile.create({
          data: {
            name: 'Test Profile',
          },
        });

        const experience = await prisma.experience.create({
          data: {
            profileId: profile.id,
            company: 'Old Company',
            position: 'Backend Developer',
            startedAt: new Date('2022-01-01'),
            endedAt: new Date('2023-01-01'),
            achievements: 'Initial achievements',
          },
        });

        const result = await updateProfile<{
          id: number;
          experiences: Array<{
            id: number;
            company: string;
          }>;
        }>(
          profile.id,
          {
            experiences: {
              delete: [experience.id],
            },
          },
          `
            id
            experiences {
              id
              company
            }
          `,
        );

        expect(result).toEqual({
          id: profile.id,
          experiences: [],
        });
      });
    });

    describe('projects', () => {
      it('creates project', async () => {
        const profile = await prisma.profile.create({
          data: {
            name: 'Test Profile',
          },
        });

        const result = await updateProfile<{
          id: number;
          projects: Array<{
            id: number;
            name: string;
          }>;
        }>(
          profile.id,
          {
            projects: {
              create: [
                {
                  name: 'New Project',
                },
              ],
            },
          },
          `
            id
            projects {
              id
              name
            }
          `,
        );

        expect(result).toEqual({
          id: profile.id,
          projects: [
            {
              id: expect.any(Number),
              name: 'New Project',
            },
          ],
        });
      });

      it('creates project with link', async () => {
        const profile = await prisma.profile.create({
          data: {
            name: 'Test Profile',
          },
        });

        const result = await updateProfile<{
          id: number;
          projects: Array<{
            id: number;
            name: string;
            link: {
              id: number;
              name: string;
              url: string;
            } | null;
          }>;
        }>(
          profile.id,
          {
            projects: {
              create: [
                {
                  name: 'New Project',
                  link: {
                    name: 'Repository',
                    url: 'https://github.com/test/project',
                  },
                },
              ],
            },
          },
          `
            id
            projects {
              id
              name
              link {
                id
                name
                url
              }
            }
          `,
        );

        expect(result).toEqual({
          id: profile.id,
          projects: [
            {
              id: expect.any(Number),
              name: 'New Project',
              link: {
                id: expect.any(Number),
                name: 'Repository',
                url: 'https://github.com/test/project',
              },
            },
          ],
        });
      });

      it('updates project', async () => {
        const profile = await prisma.profile.create({
          data: {
            name: 'Test Profile',
          },
        });

        const project = await prisma.project.create({
          data: {
            profileId: profile.id,
            name: 'Old Project',
          },
        });

        const result = await updateProfile<{
          id: number;
          projects: Array<{
            id: number;
            name: string;
          }>;
        }>(
          profile.id,
          {
            projects: {
              update: [
                {
                  id: project.id,
                  name: 'Updated Project',
                },
              ],
            },
          },
          `
            id
            projects {
              id
              name
            }
          `,
        );

        expect(result).toEqual({
          id: profile.id,
          projects: [
            {
              id: project.id,
              name: 'Updated Project',
            },
          ],
        });
      });

      it('deletes project', async () => {
        const profile = await prisma.profile.create({
          data: {
            name: 'Test Profile',
          },
        });

        const project = await prisma.project.create({
          data: {
            profileId: profile.id,
            name: 'Old Project',
          },
        });

        const result = await updateProfile<{
          id: number;
          projects: Array<{
            id: number;
            name: string;
          }>;
        }>(
          profile.id,
          {
            projects: {
              delete: [project.id],
            },
          },
          `
            id
            projects {
              id
              name
            }
          `,
        );

        expect(result).toEqual({
          id: profile.id,
          projects: [],
        });
      });

      it('updates project link', async () => {
        const profile = await prisma.profile.create({
          data: {
            name: 'Test Profile',
          },
        });

        const project = await prisma.project.create({
          data: {
            profileId: profile.id,
            name: 'Test Project',
            link: {
              create: {
                name: 'Repository',
                url: 'https://github.com/initial/project',
              },
            },
          },
          include: {
            link: true,
          },
        });

        const result = await updateProfile<{
          id: number;
          projects: Array<{
            id: number;
            name: string;
            link: {
              id: number;
              name: string;
              url: string;
            } | null;
          }>;
        }>(
          profile.id,
          {
            projects: {
              update: [
                {
                  id: project.id,
                  link: {
                    update: {
                      name: 'Repository',
                      url: 'https://github.com/updated/project',
                    },
                  },
                },
              ],
            },
          },
          `
            id
            projects {
              id
              name
              link {
                id
                name
                url
              }
            }
          `,
        );

        expect(result).toEqual({
          id: profile.id,
          projects: [
            {
              id: project.id,
              name: 'Test Project',
              link: {
                id: project.link?.id,
                name: 'Repository',
                url: 'https://github.com/updated/project',
              },
            },
          ],
        });
      });
    });
  });

  describe('removeProfile', () => {
    it('removes profile', async () => {
      const profile = await prisma.profile.create({
        data: {
          name: 'Test Profile',
        },
      });

      const mutation = `
        mutation RemoveProfile($id: Int!) {
          removeProfile(id: $id)
        }
      `;

      const data = await graphqlRequest<{
        removeProfile: boolean;
      }>(mutation, {
        id: profile.id,
      });

      expect(data.removeProfile).toBe(true);

      const deletedProfile = await prisma.profile.findUnique({
        where: {
          id: profile.id,
        },
      });

      expect(deletedProfile).toBeNull();
    });
  });
});
