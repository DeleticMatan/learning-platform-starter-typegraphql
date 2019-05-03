import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm'
import { ObjectType, Field, ID } from 'type-graphql'

@ObjectType()
@Entity()
export class CourseStatus extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @Column()
  userId: string

  @Field()
  @Column()
  courseId: string

  @Field()
  @Column()
  status: string
}
