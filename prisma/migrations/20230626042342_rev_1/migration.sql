/*
  Warnings:

  - You are about to drop the `CourseInCart` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CourseInCart" DROP CONSTRAINT "CourseInCart_cartId_fkey";

-- DropForeignKey
ALTER TABLE "CourseInCart" DROP CONSTRAINT "CourseInCart_courseId_fkey";

-- DropTable
DROP TABLE "CourseInCart";

-- CreateTable
CREATE TABLE "courseInCart" (
    "courseId" INTEGER NOT NULL,
    "cartId" INTEGER NOT NULL,

    CONSTRAINT "courseInCart_pkey" PRIMARY KEY ("courseId","cartId")
);

-- AddForeignKey
ALTER TABLE "courseInCart" ADD CONSTRAINT "courseInCart_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "courseInCart" ADD CONSTRAINT "courseInCart_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "carts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
