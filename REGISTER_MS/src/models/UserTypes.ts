// user
export type TUser = {
  id: string
  name: string
  email: string
  cpf: string
  streetNumber: number
  neighborhood: string
  city: string
  state: string
  country: string
  password: string
}

// create user
export type TCreateUserDTO = Omit<TUser, 'id'> & {
  confirmPassword: string
}

export type TCreateUserResponse = Pick<TUser, 'name' | 'email' | 'cpf'>

// repositories
export interface IUserRepository {
  createUser: (data: TCreateUserDTO) => Promise<TUser>
  deleteAllUsers: () => Promise<void>
  findByCPF: (cpf: string) => Promise<TUser>
}

// services
// type TCreateUserResponse = { data: Omit<TCreateUserDTO, TUser['password'] & TUser['password']> }
export interface IServiceCreateUser {
  execute: (data: TCreateUserDTO) => Promise<Partial<TCreateUserResponse>>
}
export interface IServiceDeleteAllUsers {
  execute: () => Promise<void>
}

// exceptions
export interface IException {
  message: string
  status: number
  name: string
}
