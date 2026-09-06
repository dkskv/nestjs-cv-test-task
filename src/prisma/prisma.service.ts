import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  private readonly client = new PrismaClient({
    // log: ['query'],
  });

  get experience(): PrismaClient['experience'] {
    return this.client.experience;
  }

  get skill(): PrismaClient['skill'] {
    return this.client.skill;
  }

  get profileLink(): PrismaClient['profileLink'] {
    return this.client.profileLink;
  }

  get projectLink(): PrismaClient['projectLink'] {
    return this.client.projectLink;
  }

  get project(): PrismaClient['project'] {
    return this.client.project;
  }

  get profile(): PrismaClient['profile'] {
    return this.client.profile;
  }

  $transaction<T>(
    callback: (transaction: Prisma.TransactionClient) => Promise<T>,
  ): Promise<T> {
    return this.client.$transaction(callback);
  }

  async onModuleInit() {
    await this.client.$connect();
  }

  async onModuleDestroy() {
    await this.client.$disconnect();
  }
}
