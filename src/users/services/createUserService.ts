import { InputUserType, UserType } from "../../types/userType"

export const createUserService = async (inputUser: InputUserType): UserType => {
  const createUser: UserType = {
   ...userRepository.createdUserDb(),
   
  }

  return createUser
}