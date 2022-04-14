import { Injectable } from '@nestjs/common';
import slugify from 'slugify';

import { PrismaService } from '@database/prisma/prisma.service';

type CreateCourseParams = {
  title: string;
};

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  listAllCourses() {
    this.prisma.course.findMany();
  }

  getCourseById(id: string) {
    this.prisma.course.findUnique({
      where: {
        id,
      },
    });
  }

  async createCourse({ title }: CreateCourseParams) {
    const slug = slugify(title, { trim: true, lower: true });

    const courseWithSameSlug = await this.prisma.course.findUnique({
      where: {
        slug,
      },
    });

    if (!!courseWithSameSlug) {
      throw new Error(`Course with slug ${slug} already exists`);
    }

    return this.prisma.course.create({
      data: {
        title,
        slug,
      },
    });
  }
}
