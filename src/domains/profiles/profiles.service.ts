import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateProfileInput } from './profiles.types';

@Injectable()
export class ProfilesService {
  constructor(private readonly prisma: PrismaService) {}

  create(input: CreateProfileInput) {
    return this.prisma.profile.create({ data: input });
  }

  findAll() {
    return this.prisma.profile.findMany();
  }

  findOne(id: number) {
    return this.prisma.profile.findUniqueOrThrow({ where: { id } });
  }

  remove(id: number) {
    return this.prisma.profile.delete({ where: { id } });
  }
}
