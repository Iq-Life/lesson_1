import { UserDBType } from "../../types/db-types/userDBTypes";
import { usersCollection } from "../../db/db";

// DAL ()
export const userRepository = {
  async createUser(newUser: UserDBType): Promise<UserDBType | null> {
    const createdInfo = await usersCollection.insertOne(newUser)

    return createdInfo.insertedId ? newUser : null
  }
}