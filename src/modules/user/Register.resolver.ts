import { Resolver, Mutation, Arg, UseMiddleware } from "type-graphql"
import bcrypt from "bcryptjs"

import { User } from "../../entity/User"
import { isAdmin } from "../middleware/isAdmin"
import { RegisterInput } from "./helpers/RegisterInput"

@Resolver()
export class RegisterResolver {
  @UseMiddleware(isAdmin)
  @Mutation(() => User)
  async register(@Arg("data")
  {
    firstName,
    lastName,
    companyName,
    email,
    password
  }: RegisterInput): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await User.create({
      firstName,
      lastName,
      companyName,
      email,
      password: hashedPassword,
      isActive: true
    }).save()

    return user
  }
}
