import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm'
import { ObjectType, Field, ID, Ctx, Root } from 'type-graphql'

import Status from '../types/Status'
import { MyContext } from '../types/MyContext'
import { Question } from './Question'
import { CourseStatus } from './CourseStatus'

@ObjectType()
@Entity()
export class Course extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @Column()
  title: string

  @Field()
  @Column()
  description: string

  @Field()
  @Column()
  duration: string

  @Field()
  @Column()
  thumbnail: string

  @Field()
  @Column()
  vimeoId: string

  @Field(() => Status)
  async status(@Root() parent: Course, @Ctx() ctx: MyContext): Promise<Status> {
    if (!ctx.req.session!.userId) {
      return Status.UNWATCHED
    }

    const userId = ctx.req.session!.userId

    const courseStatus = await CourseStatus.findOne({
      where: {
        userId,
        courseId: parent.id
      }
    })

    if (!courseStatus) {
      return Status.UNWATCHED
    }

    if (courseStatus.status === Status.WATCHED) {
      return Status.WATCHED
    }

    if (courseStatus.status === Status.PASSED) {
      return Status.PASSED
    }

    return Status.UNWATCHED
  }

  @Field(() => [Question], { nullable: true })
  questions: Question[]
}
