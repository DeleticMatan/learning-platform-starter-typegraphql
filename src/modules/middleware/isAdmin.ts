import { MiddlewareFn } from "type-graphql"
import { MyContext } from "../../types/MyContext"

export const isAdmin: MiddlewareFn<MyContext> = async ({ context }, next) => {
  if (!context.req.session!.userId) {
    throw new Error("Not authenticated")
  }

  if (
    context.req.session &&
    context.req.session!.userId != process.env.ADMIN_ID
  ) {
    throw new Error("Not authorized")
  }

  return next()
}
