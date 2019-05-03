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

const updateMutation = `
  mutation updateUser(
    $id: String!
    $data: UpdateUserInput!
    ) {
    updateUser(
      id: $id
      data: $data
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

describe("Update user", () => {
  it("update user", async () => {
    const user = await User.create({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      companyName: faker.company.companyName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      isActive: true
    }).save()

    const updateData = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      companyName: faker.company.companyName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      isActive: false
    }

    const response = await gCall({
      source: updateMutation,
      userId: Number(process.env.ADMIN_ID),
      variableValues: {
        id: `${user.id}`,
        data: updateData
      }
    })
    expect(response).toMatchObject({
      data: {
        updateUser: {
          id: `${user.id}`,
          firstName: updateData.firstName,
          lastName: updateData.lastName,
          companyName: updateData.companyName,
          email: updateData.email,
          isActive: updateData.isActive
        }
      }
    })

    await User.delete(user.id)

    const responseFail = await gCall({
      source: updateMutation,
      variableValues: {
        id: `${user.id}`,
        data: updateData
      }
    })
    expect(responseFail.data).toBeNull()
  })
})
