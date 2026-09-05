-- Rename existing profile links without losing data
ALTER TABLE "Link" RENAME TO "ProfileLink";
ALTER TABLE "ProfileLink" RENAME CONSTRAINT "Link_pkey" TO "ProfileLink_pkey";
ALTER TABLE "ProfileLink" RENAME CONSTRAINT "Link_profileId_fkey" TO "ProfileLink_profileId_fkey";

-- CreateTable
CREATE TABLE "ProjectLink" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "projectId" INTEGER NOT NULL,

    CONSTRAINT "ProjectLink_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProjectLink_projectId_key" ON "ProjectLink"("projectId");

-- AddForeignKey
ALTER TABLE "ProjectLink" ADD CONSTRAINT "ProjectLink_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;