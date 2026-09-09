ALTER TABLE "Skill" ADD COLUMN "visible" BOOLEAN NOT NULL DEFAULT true;

CREATE INDEX "Skill_visible_idx" ON "Skill"("visible");
