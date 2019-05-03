import { buildSchema } from 'type-graphql'

import { RegisterResolver } from '../modules/user/Register.resolver'
import { LoginResolver } from '../modules/user/Login.resolver'
import { MeResolver } from '../modules/user/Me.resolver'
import { LogoutResolver } from '../modules/user/Logout.resolver'
import { UsersResolver } from '../modules/user/Users.resolver'
import { UpdateUserResolver } from '../modules/user/UpdateUser.resolver'
import { DeleteUserResolver } from '../modules/user/DeleteUser.resolver'
import { CoursesResolver } from '../modules/course/Courses.resolver'
import { CourseStatusResolver } from '../modules/course/CourseStatus.resolver'
import { CreateCourseResolver } from '../modules/course/CreateCourse.resolver'
import { DeleteCourseResolver } from '../modules/course/DeleteCourse.resolver'

export const createSchema = () =>
  buildSchema({
    resolvers: [
      RegisterResolver,
      LoginResolver,
      LogoutResolver,
      MeResolver,
      UsersResolver,
      UpdateUserResolver,
      DeleteUserResolver,
      CoursesResolver,
      CourseStatusResolver,
      CreateCourseResolver,
      DeleteCourseResolver
    ],
    authChecker: ({ context: { req } }) => {
      return !!req.session.userId
    }
  })
