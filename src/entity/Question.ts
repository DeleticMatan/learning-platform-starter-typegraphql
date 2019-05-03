import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"
import { ObjectType, Field, ID } from "type-graphql"

import { Answer } from "./Answer"

@ObjectType()
@Entity()
export class Question extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @Column()
  text: string

  @Field(() => [Answer])
  answers: Answer[]
}
