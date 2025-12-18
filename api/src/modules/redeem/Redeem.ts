import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkRewardCode(codeInput: string) {
  try {
    const rewardCode = await prisma.rewardCode.findUnique({
      where: {
        code: codeInput, 
      },
    });

    if (!rewardCode) {
      return { exists: false, claimed: null, amount: null };
    }

    return { exists: true, claimed: rewardCode.claimed, amount: rewardCode.amount };
  }
}
