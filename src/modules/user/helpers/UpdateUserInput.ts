import { Length, IsEmail } from "class-validator"
import { Field, InputType } from "type-graphql"

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  @Length(1, 100)
  firstName: string

  @Field({ nullable: true })
  @Length(1, 100)
  lastName: string

  @Field({ nullable: true })
  @Length(1, 255)
  companyName: string

  @Field({ nullable: true })
  @IsEmail()
  email: string

  @Field({ nullable: true })
  isActive: boolean

  @Field({ nullable: true })
  password: string
}
