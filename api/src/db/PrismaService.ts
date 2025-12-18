import { PrismaClient } from "@prisma/client";

class PrismaService {
  private static instance: PrismaClient;

  private constructor() {}

  public static getClient(): PrismaClient {
    if (!PrismaService.instance) {
      PrismaService.instance = new PrismaClient();
    }
    return PrismaService.instance;
  }
}

export default PrismaService;
