import { defineConfig } from 'prisma/config';
import 'dotenv/config';

export default defineConfig({
  schema: 'src/domains',
  migrations: {
    path: 'prisma/migrations',
    seed: 'tsx prisma/seed.ts',
  },
});
