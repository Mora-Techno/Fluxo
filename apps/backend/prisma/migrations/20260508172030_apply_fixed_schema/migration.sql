-- CreateEnum
CREATE TYPE "RoleType" AS ENUM ('user', 'developer');

-- CreateEnum
CREATE TYPE "StatusDevice" AS ENUM ('online', 'offline');

-- CreateEnum
CREATE TYPE "PlanType" AS ENUM ('monthly', 'yearly');

-- CreateEnum
CREATE TYPE "AccesPointStatus" AS ENUM ('activate', 'nonactivate');

-- CreateEnum
CREATE TYPE "StatusSubscription" AS ENUM ('active', 'past_due', 'canceled');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT,
    "password" TEXT,
    "phone" TEXT,
    "token" TEXT,
    "role" "RoleType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "otp" TEXT,
    "expOtp" TIMESTAMP(3),
    "isVerify" BOOLEAN NOT NULL DEFAULT false,
    "activateToken" TEXT,
    "activateExp" TIMESTAMP(3),
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_sessions" (
    "id" TEXT NOT NULL,
    "userAgent" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "userID" TEXT NOT NULL,

    CONSTRAINT "user_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscription" (
    "id" TEXT NOT NULL,
    "userID" TEXT NOT NULL,
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
    "longtitude" DOUBLE PRECISION NOT NULL,
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
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "users"("phone");

-- CreateIndex
CREATE INDEX "user_sessions_userID_idx" ON "user_sessions"("userID");

-- CreateIndex
CREATE INDEX "Subscription_userID_idx" ON "Subscription"("userID");

-- CreateIndex
CREATE INDEX "Home_userID_idx" ON "Home"("userID");

-- CreateIndex
CREATE INDEX "Device_homeID_idx" ON "Device"("homeID");

-- CreateIndex
CREATE INDEX "AccesPoint_deviceID_idx" ON "AccesPoint"("deviceID");

-- CreateIndex
CREATE INDEX "DeviceSession_deviceID_idx" ON "DeviceSession"("deviceID");

-- AddForeignKey
ALTER TABLE "user_sessions" ADD CONSTRAINT "user_sessions_userID_fkey" FOREIGN KEY ("userID") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_userID_fkey" FOREIGN KEY ("userID") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Home" ADD CONSTRAINT "Home_userID_fkey" FOREIGN KEY ("userID") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_homeID_fkey" FOREIGN KEY ("homeID") REFERENCES "Home"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccesPoint" ADD CONSTRAINT "AccesPoint_deviceID_fkey" FOREIGN KEY ("deviceID") REFERENCES "Device"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeviceSession" ADD CONSTRAINT "DeviceSession_deviceID_fkey" FOREIGN KEY ("deviceID") REFERENCES "Device"("id") ON DELETE CASCADE ON UPDATE CASCADE;
