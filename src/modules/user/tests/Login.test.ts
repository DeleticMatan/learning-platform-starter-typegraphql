import { Connection } from "typeorm"
import faker from "faker"
import bcrypt from "bcryptjs"

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

const loginMutation = `
  mutation login($email: String!, $password: String!) {
    login(
      email: $email
      password: $password
    ) {
      id
      firstName
      lastName
      companyName
      email
      isActive
    }
  }
`

describe("Login", () => {
  it("login user", async () => {
    const password = faker.internet.password()
    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await User.create({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      companyName: faker.company.companyName(),
      email: faker.internet.email(),
      password: hashedPassword,
      isActive: true
    }).save()

    const response = await gCall({
      source: loginMutation,
      variableValues: {
        email: user.email,
        password: password
      }
    })
    expect(response).toMatchObject({
      data: {
        login: {
          id: `${user.id}`,
          firstName: user.firstName,
          lastName: user.lastName,
          companyName: user.companyName,
          email: user.email,
          isActive: user.isActive
        }
      }
    })

    const responseFail = await gCall({
      source: loginMutation,
      variableValues: {
        email: `${user.email}fail`,
        password: `${password}fail`
      }
    })
    expect(responseFail.data).toBeNull()
  })
})
