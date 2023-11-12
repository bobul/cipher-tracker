-- CreateTable
CREATE TABLE "Plaintext" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Plaintext_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Algorithm" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Algorithm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ciphertext" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "plaintextId" INTEGER NOT NULL,
    "algorithmId" INTEGER NOT NULL,

    CONSTRAINT "Ciphertext_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Ciphertext" ADD CONSTRAINT "Ciphertext_plaintextId_fkey" FOREIGN KEY ("plaintextId") REFERENCES "Plaintext"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ciphertext" ADD CONSTRAINT "Ciphertext_algorithmId_fkey" FOREIGN KEY ("algorithmId") REFERENCES "Algorithm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
