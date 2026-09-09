import { PrismaService } from '../../src/prisma/prisma.service';

export async function cleanDatabase(prisma: PrismaService): Promise<void> {
  await prisma.$executeRawUnsafe(`
    TRUNCATE TABLE
      "ProfileLink",
      "ProjectLink",
      "Experience",
      "Project",
      "Profile",
      "Skill"
    RESTART IDENTITY CASCADE;
  `);
}
