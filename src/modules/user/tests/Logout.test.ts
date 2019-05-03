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

const logoutMutation = `
  mutation logout {
    logout
  }
`

describe("Logout", () => {
  it("logout user", async () => {
    const user = await User.create({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      companyName: faker.company.companyName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      isActive: true
    }).save()

    const response = await gCall({
      source: logoutMutation,
      userId: user.id
    })
    expect(response).toBeTruthy()

    const responseFail = await gCall({
      source: logoutMutation
    })
    expect(responseFail.data).toBeNull()
  })
})
