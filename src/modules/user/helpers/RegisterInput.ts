import { Length, IsEmail } from "class-validator"
import { Field, InputType } from "type-graphql"
import { IsEmailAlreadyExist } from "./isEmailAlreadyExist"

@InputType()
export class RegisterInput {
  @Field()
  @Length(1, 100)
  firstName: string

  @Field()
  @Length(1, 100)
  lastName: string

  @Field()
  @Length(1, 255)
  companyName: string

  @Field()
  @IsEmail()
  @IsEmailAlreadyExist({ message: "Email in use" })
  email: string

  @Field()
  @Length(6, 100)
  password: string
}
