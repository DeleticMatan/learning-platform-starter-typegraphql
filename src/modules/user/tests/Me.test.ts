import { Connection } from "typeorm"
import faker from "faker"

import { testConnection } from "../../../test-utils/testConnection"
import { gCall } from "../../../test-utils/gCall"
import { User } from "../../../entity/User"

let connection: Connection
beforeAll(async () => {
  connection = await testConnection()
})
afterAll(async () => {
  await connection.close()
})

const meQuery = `
  query Me {
    me {
      id
      firstName
      lastName
      name
      companyName
      email
      isActive
    }
  }
`

describe("Me", () => {
  it("get user", async () => {
    const user = await User.create({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      companyName: faker.company.companyName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      isActive: true
    }).save()

    const response = await gCall({
      source: meQuery,
      userId: user.id
    })

    expect(response).toMatchObject({
      data: {
        me: {
          id: `${user.id}`,
          firstName: user.firstName,
          lastName: user.lastName,
          companyName: user.companyName,
          email: user.email,
          isActive: user.isActive
        }
      }
    })
  })

  it("return null", async () => {
    const response = await gCall({
      source: meQuery
    })

    expect(response).toMatchObject({
      data: {
        me: null
      }
    })
  })
})
