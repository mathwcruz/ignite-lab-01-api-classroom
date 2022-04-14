import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import path from 'node:path';

import { DatabaseModule } from '@database/database.module';

import { CourseResolver } from '@http/graphql/resolvers/courses.resolver';
import { EnrollmentResolver } from '@http/graphql/resolvers/enrollments.resolver';
import { StudentResolver } from '@http/graphql/resolvers/students.resolver';

import { CoursesService } from '@services/courses.service';
import { EnrollmentsService } from '@services/enrollments.service';
import { StudentsService } from '@services/students.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: path.resolve(process.cwd(), 'src/schema.gql'),
    }),
  ],
  providers: [
    //Resolvers
    CourseResolver,
    EnrollmentResolver,
    StudentResolver,

    //Services
    CoursesService,
    EnrollmentsService,
    StudentsService,
  ],
})
export class HttpModule {}
