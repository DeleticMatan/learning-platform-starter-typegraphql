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

const usersQuery = `
  query Users {
    users {
      id
      firstName
      lastName
      companyName
      email
      isActive
    }
  }
`

describe("Register", () => {
  it("create user", async () => {
    await User.create({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      companyName: faker.company.companyName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      isActive: true
    }).save()

    const response = await gCall({
      source: usersQuery,
      userId: Number(process.env.ADMIN_ID)
    })
    expect(response.data).toBeDefined()
  })
})
