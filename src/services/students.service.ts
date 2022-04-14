import { Injectable } from '@nestjs/common';

import { PrismaService } from '@database/prisma/prisma.service';

@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService) {}

  getStudentByAuthUserId(authUserId: string) {
    return this.prisma.student.findUnique({
      where: {
        authUserId,
      },
    });
  }

  listAllStudents() {
    this.prisma.student.findMany();
  }

  getStudentById(id: string) {
    this.prisma.student.findUnique({
      where: {
        id,
      },
    });
  }
}
