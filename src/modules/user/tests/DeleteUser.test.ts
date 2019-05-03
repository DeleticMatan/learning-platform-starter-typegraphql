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

const deleteMutation = `
  mutation deleteUser($id: String!) {
    deleteUser(
      id: $id
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

describe("Delete user", () => {
  it("delete user", async () => {
    const user = await User.create({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      companyName: faker.company.companyName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      isActive: true
    }).save()

    const response = await gCall({
      source: deleteMutation,
      userId: Number(process.env.ADMIN_ID),
      variableValues: {
        id: `${user.id}`
      }
    })
    expect(response).toMatchObject({
      data: {
        deleteUser: {
          id: `${user.id}`,
          firstName: user.firstName,
          lastName: user.lastName,
          companyName: user.companyName,
          email: user.email,
          isActive: user.isActive
        }
      }
    })

    const dbUser = await User.findOne({
      where: {
        id: user.id
      }
    })
    expect(dbUser).toBeUndefined()

    const responseFail = await gCall({
      source: deleteMutation,
      variableValues: {
        id: `${user.id}`
      }
    })
    expect(responseFail.data).toBeNull()
  })
})
