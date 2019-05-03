import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm'
import { ObjectType, Field, Root, ID } from 'type-graphql'

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @Column()
  firstName: string

  @Field()
  @Column()
  lastName: string

  @Field()
  @Column()
  companyName: string

  @Field()
  @Column('text', { unique: true })
  email: string

  @Field()
  name(@Root() parent: User): string {
    return `${parent.firstName} ${parent.lastName}`
  }

  @Column()
  password: string

  @Field()
  @Column()
  isActive: boolean

  @Field()
  isAdmin(@Root() parent: User): boolean {
    return parent.id === 12
  }
}
