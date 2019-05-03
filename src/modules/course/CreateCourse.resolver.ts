import { Resolver, Mutation, Arg } from 'type-graphql'

import { Course } from '../../entity/Course'

@Resolver()
export class CreateCourseResolver {
  @Mutation(() => Course)
  async createCourse(
    @Arg('title') title: string,
    @Arg('description') description: string,
    @Arg('duration') duration: string,
    @Arg('thumbnail') thumbnail: string,
    @Arg('vimeoId') vimeoId: string
  ): Promise<Course> {
    const course = await Course.create({
      title,
      description,
      duration,
      thumbnail,
      vimeoId
    }).save()

    return course
  }
}
