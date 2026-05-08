/*
  Warnings:

  - The values [USER,ADMIN] on the enum `RoleType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `userId` on the `user_sessions` table. All the data in the column will be lost.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userID` to the `user_sessions` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "StatusDevice" AS ENUM ('online', 'offline');

-- CreateEnum
CREATE TYPE "PlanType" AS ENUM ('monthly', 'yearly');

-- CreateEnum
CREATE TYPE "AccesPointStatus" AS ENUM ('activate', 'nonactivate');

-- CreateEnum
CREATE TYPE "StatusSubscription" AS ENUM ('active', 'past_due', 'canceled');

-- AlterEnum
BEGIN;
CREATE TYPE "RoleType_new" AS ENUM ('user', 'developer');
ALTER TABLE "users" ALTER COLUMN "role" TYPE "RoleType_new" USING ("role"::text::"RoleType_new");
ALTER TYPE "RoleType" RENAME TO "RoleType_old";
ALTER TYPE "RoleType_new" RENAME TO "RoleType";
DROP TYPE "public"."RoleType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_userId_fkey";

-- DropForeignKey
ALTER TABLE "user_sessions" DROP CONSTRAINT "user_sessions_userId_fkey";

-- DropIndex
DROP INDEX "user_sessions_userId_idx";

-- AlterTable
ALTER TABLE "user_sessions" DROP COLUMN "userId",
ADD COLUMN     "userID" TEXT NOT NULL;

-- DropTable
DROP TABLE "Category";

-- CreateTable
CREATE TABLE "Subscription" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "plan" "PlanType" NOT NULL,
    "status" "StatusSubscription" NOT NULL,
    "current_period_start" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "current_period_end" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Home" (
    "id" TEXT NOT NULL,
    "userID" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "lingtitude" DOUBLE PRECISION NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "radius" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Home_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MlModel" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "modelPath" TEXT NOT NULL,
    "metrics" JSONB,
    "isActive" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MlModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Device" (
    "id" TEXT NOT NULL,
    "homeID" TEXT NOT NULL,
    "status" "StatusDevice" NOT NULL,
    "firmware_version" TEXT NOT NULL,
    "last_ping" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Device_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AccesPoint" (
    "id" TEXT NOT NULL,
    "deviceID" TEXT NOT NULL,
    "room_name" TEXT NOT NULL,
    "status" "AccesPointStatus" NOT NULL,

    CONSTRAINT "AccesPoint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DeviceSession" (
    "id" TEXT NOT NULL,
    "deviceID" TEXT NOT NULL,
    "total_tokens_used" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DeviceSession_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Subscription_userId_idx" ON "Subscription"("userId");

-- CreateIndex
CREATE INDEX "Home_userID_idx" ON "Home"("userID");

-- CreateIndex
CREATE INDEX "Device_homeID_idx" ON "Device"("homeID");

-- CreateIndex
CREATE INDEX "AccesPoint_deviceID_idx" ON "AccesPoint"("deviceID");

-- CreateIndex
CREATE INDEX "DeviceSession_deviceID_idx" ON "DeviceSession"("deviceID");

-- CreateIndex
CREATE INDEX "user_sessions_userID_idx" ON "user_sessions"("userID");

-- AddForeignKey
ALTER TABLE "user_sessions" ADD CONSTRAINT "user_sessions_userID_fkey" FOREIGN KEY ("userID") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Home" ADD CONSTRAINT "Home_userID_fkey" FOREIGN KEY ("userID") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_homeID_fkey" FOREIGN KEY ("homeID") REFERENCES "Home"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccesPoint" ADD CONSTRAINT "AccesPoint_deviceID_fkey" FOREIGN KEY ("deviceID") REFERENCES "Device"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeviceSession" ADD CONSTRAINT "DeviceSession_deviceID_fkey" FOREIGN KEY ("deviceID") REFERENCES "Device"("id") ON DELETE CASCADE ON UPDATE CASCADE;
