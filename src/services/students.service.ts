import { Injectable } from '@nestjs/common';

import { PrismaService } from '@database/prisma/prisma.service';

type CreateStudentParams = {
  authUserId: string;
};

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

  getStudentById(id: string) {
    return this.prisma.student.findUnique({
      where: {
        id,
      },
    });
  }

  listAllStudents() {
    return this.prisma.student.findMany();
  }

  createStudent({ authUserId }: CreateStudentParams) {
    return this.prisma.student.create({
      data: {
        authUserId,
      },
    });
  }
}
