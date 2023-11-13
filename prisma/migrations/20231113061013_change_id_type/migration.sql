/*
  Warnings:

  - The primary key for the `Algorithm` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Ciphertext` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Plaintext` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Ciphertext" DROP CONSTRAINT "Ciphertext_algorithmId_fkey";

-- DropForeignKey
ALTER TABLE "Ciphertext" DROP CONSTRAINT "Ciphertext_plaintextId_fkey";

-- AlterTable
ALTER TABLE "Algorithm" DROP CONSTRAINT "Algorithm_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Algorithm_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Algorithm_id_seq";

-- AlterTable
ALTER TABLE "Ciphertext" DROP CONSTRAINT "Ciphertext_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "plaintextId" SET DATA TYPE TEXT,
ALTER COLUMN "algorithmId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Ciphertext_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Ciphertext_id_seq";

-- AlterTable
ALTER TABLE "Plaintext" DROP CONSTRAINT "Plaintext_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Plaintext_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Plaintext_id_seq";

-- AddForeignKey
ALTER TABLE "Ciphertext" ADD CONSTRAINT "Ciphertext_plaintextId_fkey" FOREIGN KEY ("plaintextId") REFERENCES "Plaintext"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ciphertext" ADD CONSTRAINT "Ciphertext_algorithmId_fkey" FOREIGN KEY ("algorithmId") REFERENCES "Algorithm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
