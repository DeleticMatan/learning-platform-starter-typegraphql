import { registerEnumType } from 'type-graphql'

enum Status {
  UNWATCHED = 'UNWATCHED',
  WATCHED = 'WATCHED',
  PASSED = 'PASSED'
}

registerEnumType(Status, {
  name: 'Status',
  description:
    "Course status for given user. If there is no info in DB, default is 'UNWATCHED'."
})

export default Status
