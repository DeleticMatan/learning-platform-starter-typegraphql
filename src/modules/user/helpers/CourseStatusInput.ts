import { Field, InputType } from 'type-graphql'

import Status from 'src/types/Status'

@InputType()
export class CourseStatusInput {
  @Field()
  courseId: string

  @Field(() => Status)
  Status: Status
}
