import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';

interface CreateProfileData {
  name: string;
  description: string;
}

@Injectable()
export class ProfilesService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateProfileData) {
    return this.prisma.profile.create({ data });
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
