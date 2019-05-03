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

const registerMutation = `
  mutation Register($data: RegisterInput!) {
    register(
      data: $data
    ) {
      firstName
      lastName
      companyName
      email
    }
  }
`

describe("Register", () => {
  it("create user", async () => {
    const user = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      companyName: faker.company.companyName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    }

    const response = await gCall({
      source: registerMutation,
      userId: Number(process.env.ADMIN_ID),
      variableValues: {
        data: user
      }
    })
    expect(response).toMatchObject({
      data: {
        register: {
          firstName: user.firstName,
          lastName: user.lastName,
          companyName: user.companyName,
          email: user.email
        }
      }
    })

    const dbUser = await User.findOne({
      where: {
        email: user.email
      }
    })
    expect(dbUser).toBeDefined()
    expect(dbUser!.firstName).toBe(user.firstName)
    expect(dbUser!.lastName).toBe(user.lastName)
    expect(dbUser!.companyName).toBe(user.companyName)
    expect(dbUser!.email).toBe(user.email)
    expect(dbUser!.isActive).toBe(true)
  })
})
