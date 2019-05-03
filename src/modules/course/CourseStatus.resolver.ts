import { Resolver, Mutation, Arg, Ctx, UseMiddleware } from 'type-graphql'

import { MyContext } from '../../types/MyContext'
import Status from '../../types/Status'
import { isAuth } from '../middleware/isAuth'
import { CourseStatus } from '../../entity/CourseStatus'

@Resolver()
export class CourseStatusResolver {
  @UseMiddleware(isAuth)
  @Mutation(() => Boolean)
  async courseStatus(
    @Arg('courseId') courseId: string,
    @Arg('status', () => Status) status: Status,
    @Ctx() ctx: MyContext
  ): Promise<Boolean> {
    if (!ctx.req.session!.userId) {
      throw new Error('User not found')
    }

    const userId = ctx.req.session!.userId

    const courseStatus = await CourseStatus.findOne({
      where: {
        userId,
        courseId
      }
    })

    if (!courseStatus) {
      await CourseStatus.create({
        userId,
        courseId,
        status
      }).save()

      return true
    }

    courseStatus.userId = userId ? userId : courseStatus.userId
    courseStatus.courseId = courseId ? courseId : courseStatus.courseId
    courseStatus.status = status ? status : courseStatus.status

    await CourseStatus.save(courseStatus)

    return true
  }
}
