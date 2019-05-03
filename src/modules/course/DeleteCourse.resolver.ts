import { Resolver, Mutation, Arg } from 'type-graphql'

import { Course } from '../../entity/Course'

@Resolver()
export class DeleteCourseResolver {
  @Mutation(() => Course)
  async deleteCourse(@Arg('id') id: string): Promise<Course> {
    let course = await Course.findOne(id)

    if (!course) {
      throw new Error('Can not delete course')
    }

    await Course.delete(id)

    return course
  }
}
