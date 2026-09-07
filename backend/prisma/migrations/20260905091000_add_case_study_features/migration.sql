CREATE TABLE "CaseStudyFeature" (
    "id" TEXT NOT NULL,
    "caseStudyId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CaseStudyFeature_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "CaseStudyFeature_caseStudyId_order_idx" ON "CaseStudyFeature"("caseStudyId", "order");

ALTER TABLE "CaseStudyFeature" ADD CONSTRAINT "CaseStudyFeature_caseStudyId_fkey" FOREIGN KEY ("caseStudyId") REFERENCES "CaseStudy"("id") ON DELETE CASCADE ON UPDATE CASCADE;