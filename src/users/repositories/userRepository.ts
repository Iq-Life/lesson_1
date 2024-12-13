import { ObjectId } from "mongodb";
import { UserDBType } from "../../types/db-types/UserDBTypes";
import { InputUserType } from "../../types/userType";

const userRepository = {
  async createUser(userData: InputUserType): Promise<UserDBType> {


    const newUser: UserDBType = {
      _id: new ObjectId(),
      login: userData.login,
      email: userData.email,
      createdAt: new Date().toISOString(),
      password: userData.password
    }

    return newUser
  }
}