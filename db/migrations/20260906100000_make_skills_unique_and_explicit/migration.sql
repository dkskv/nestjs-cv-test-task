CREATE TEMP TABLE "_SkillIdMap" AS
SELECT
    "id" AS "oldId",
    MIN("id") OVER (PARTITION BY "name") AS "skillId"
FROM "Skill";

DELETE FROM "_ProfileToSkill" relation
USING "_SkillIdMap" mapping
WHERE relation."B" = mapping."oldId"
    AND mapping."oldId" <> mapping."skillId"
    AND EXISTS (
        SELECT 1
        FROM "_ProfileToSkill" existing
        WHERE existing."A" = relation."A"
            AND existing."B" = mapping."skillId"
    );

UPDATE "_ProfileToSkill" relation
SET "B" = mapping."skillId"
FROM "_SkillIdMap" mapping
WHERE relation."B" = mapping."oldId"
    AND mapping."oldId" <> mapping."skillId";

DELETE FROM "Skill" skill
USING "_SkillIdMap" mapping
WHERE skill."id" = mapping."oldId"
  AND mapping."oldId" <> mapping."skillId";

CREATE UNIQUE INDEX "Skill_name_key" ON "Skill"("name");