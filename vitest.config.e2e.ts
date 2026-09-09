import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['test/**/*.e2e-spec.ts'],
    globals: true,
    environment: 'node',

    // Т.к. тесты в разных файлах могут использовать одну и ту же БД
    fileParallelism: false,
  },
});
