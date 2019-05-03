import { Resolver, Mutation, Arg, ID, UseMiddleware } from 'type-graphql'
import bcrypt from 'bcryptjs'

import { User } from '../../entity/User'
import { UpdateUserInput } from './helpers/UpdateUserInput'
import { isAdmin } from '../middleware/isAdmin'

@Resolver()
export class UpdateUserResolver {
  @UseMiddleware(isAdmin)
  @Mutation(() => User)
  async updateUser(
    @Arg('id', () => ID) id: string,
    @Arg('data')
    {
      firstName,
      lastName,
      companyName,
      email,
      password,
      isActive
    }: UpdateUserInput
  ): Promise<User> {
    let user = await User.findOne(id)

    if (!user) {
      throw new Error('Can not update user')
    }

    if (email && email !== user.email) {
      const emailInUse = await User.findOne({
        where: {
          email
        }
      })

      if (emailInUse) {
        throw new Error('Email in use')
      }
    }

    user.firstName = firstName ? firstName : user.firstName
    user.lastName = lastName ? lastName : user.lastName
    user.companyName = companyName ? companyName : user.companyName
    user.email = email ? email : user.email
    user.password = password ? await bcrypt.hash(password, 12) : user.password
    user.isActive = isActive !== null ? isActive : user.isActive

    await User.save(user)

    return user
  }
}
