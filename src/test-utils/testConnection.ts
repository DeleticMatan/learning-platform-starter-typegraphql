import { createConnection } from "typeorm"

export const testConnection = (drop: boolean = false) => {
  return createConnection({
    name: "default",
    type: "postgres",
    host: "ec2-54-247-70-127.eu-west-1.compute.amazonaws.com",
    port: 5432,
    username: "wtxtsyipojzwey",
    password:
      "963c0fc3b27555c316b692cf253a8d69d8a10830d2c6025038e14321de24ff02",
    database: "d5cga8r7i8tu1u",
    ssl: true,
    synchronize: true,
    dropSchema: drop,
    entities: [__dirname + "/../entity/*.*"]
  })
}
