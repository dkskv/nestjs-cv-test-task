import { PrismaClient } from '@prisma-generated/client';
import { profileSeed } from './seed-data';
import { PrismaPg } from '@prisma/adapter-pg';

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: process.env.DATABASE_URL,
  }),
});

async function main() {
  const existingProfile = await prisma.profile.findFirst({
    where: { name: profileSeed.name },
  });

  if (existingProfile) {
    return;
  }

  await prisma.profile.create({
    data: {
      name: profileSeed.name,
      description: profileSeed.description,
      projects: {
        create: profileSeed.projects.map((project) => ({
          name: project.name,
          link: { create: project.link },
        })),
      },
      experiences: {
        create: profileSeed.experiences,
      },
      links: {
        create: profileSeed.links,
      },
      skills: {
        connectOrCreate: profileSeed.skills.map((name) => ({
          where: { name },
          create: { name },
        })),
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
