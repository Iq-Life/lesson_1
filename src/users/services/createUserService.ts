import { ObjectId } from "mongodb"
import { UserDBType } from "../../types/db-types/userDBTypes"
import { userRepository } from "../repositories/userRepository"
import bcrypt from 'bcrypt'
import { UserType } from "../../types/userType"

// BLL (business logic layer)
export const userService = {
  async  createUser(login: string, email: string, password: string): Promise<UserType | null> {
    const pasSalt = await bcrypt.genSalt(10)
    const pasHash = await this._generateHash(password, pasSalt)
    
    const newUser: UserDBType = {
      _id: new ObjectId(),
      login,
      email,
      createdAt: new Date().toISOString(),
      passwordHash: pasHash,
      passwordSalt: pasSalt
    }
    const createdUser = await userRepository.createUser(newUser)
   
    return createdUser
    ? {
      id: createdUser._id.toString(),
      login: createdUser.login,
      email: createdUser.email,
      createdAt: createdUser.createdAt
    }
    : null
  },

  async _generateHash(password: string, salt: string): Promise<string> {
    const hash = await bcrypt.hash(password, salt)
    console.log('hash: ' + hash);
    
    return hash
  }
}