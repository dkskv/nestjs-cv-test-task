-- AlterTable
ALTER TABLE "Experience"
ADD COLUMN "startedAt" TIMESTAMP(3),
ADD COLUMN "endedAt" TIMESTAMP(3),
ADD COLUMN "achievements" TEXT NOT NULL DEFAULT '';

-- Preserve existing rows while making startedAt required.
UPDATE "Experience"
SET "startedAt" = CURRENT_TIMESTAMP
WHERE "startedAt" IS NULL;

ALTER TABLE "Experience"
ALTER COLUMN "startedAt" SET NOT NULL;
