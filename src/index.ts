import 'reflect-metadata'
import { ApolloServer } from 'apollo-server-express'
import Express from 'express'
import { createConnection } from 'typeorm'
import session from 'express-session'
import connectRedis from 'connect-redis'
import cors from 'cors'

import { redis } from './redis'
import { createSchema } from './utils/createSchema'

require('dotenv').config()

const main = async () => {
  await createConnection()

  const schema = await createSchema()

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }: any) => ({ req, res })
  })

  const app = Express()

  const RedisStore = connectRedis(session)

  app.use(
    cors({
      credentials: true,
      origin: [
        'http://localhost:3000',
        'https://zastita-na-radu-frontend.herokuapp.com'
      ]
    })
  )

  app.use(
    session({
      store: new RedisStore({
        client: redis as any
      }),
      name: 'qid',
      secret: process.env.REDIS_SECRET || '',
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 7 * 365
      }
    })
  )

  apolloServer.applyMiddleware({ app, cors: false })

  app.listen(process.env.PORT || 4000, () => {
    console.log('GraphQL server started on port:', process.env.PORT || 4000)
  })
}

main()
