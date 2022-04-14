import { UseGuards } from '@nestjs/common';
import { Query, Resolver, ResolveField, Parent } from '@nestjs/graphql';

import { AuthorizationGuard } from '@http/auth/authorization.guard';
import { Student } from '@http/graphql/models/student';

import { EnrollmentsService } from '@services/enrollments.service';
import { StudentsService } from '@services/students.service';

@Resolver(() => Student)
export class StudentResolver {
  constructor(
    private studentsService: StudentsService,
    private enrollmentsService: EnrollmentsService,
  ) {}

  @Query(() => [Student])
  @UseGuards(AuthorizationGuard)
  students() {
    return this.studentsService.listAllStudents();
  }

  @ResolveField()
  enrollments(@Parent() student: Student) {
    return this.enrollmentsService.listEnrollmentsByStudent(student.id);
  }
}
