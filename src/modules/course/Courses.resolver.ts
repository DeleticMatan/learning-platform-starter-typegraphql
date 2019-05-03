import { Resolver, Query, Arg, ID } from 'type-graphql'

import { Course } from '../../entity/Course'

@Resolver()
export class CoursesResolver {
  @Query(() => [Course])
  async courses(@Arg('id', () => ID, { nullable: true }) id: string) {
    let courses = []

    if (!id) {
      courses = await Course.find()
      return courses
    }

    const course = await Course.findOne(id)
    courses.push(course)
    return courses
  }
}
