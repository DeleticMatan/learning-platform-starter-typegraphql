import { Resolver, Mutation, Arg, ID, UseMiddleware } from 'type-graphql'

import { User } from '../../entity/User'
import { isAdmin } from '../middleware/isAdmin'

@Resolver()
export class DeleteUserResolver {
  @UseMiddleware(isAdmin)
  @Mutation(() => User)
  async deleteUser(@Arg('id', () => ID) id: string): Promise<User> {
    let user = await User.findOne(id)

    if (!user) {
      throw new Error('Can not delete user')
    }

    await User.delete(id)

    return user
  }
}
