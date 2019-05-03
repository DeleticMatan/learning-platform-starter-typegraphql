import { Resolver, Query, Arg, UseMiddleware, ID } from 'type-graphql'

import { User } from '../../entity/User'
import { isAdmin } from '../middleware/isAdmin'

@Resolver()
export class UsersResolver {
  @UseMiddleware(isAdmin)
  @Query(() => [User])
  async users(@Arg('id', () => ID, { nullable: true }) id: string) {
    let users = []

    if (!id) {
      users = await User.find()
      return users
    }

    const user = await User.findOne(id)
    users.push(user)
    return users
  }
}
