// user
export type TUser = {
  id: string
  email: string
  name: string
  cpf: string
  streetNumber: number
  neighborhood: string
  city: string
  state: string
  country: string
  password: string
  createdAt: Date
  updatedAt: Date
}

// create user
export type TCreateUserDTO = Omit<TUser, 'id' | 'createdAt' | 'updatedAt'> & { confirmPassword?: string }

export type TCreateUserResponse = {
  data: Pick<TUser, 'name' | 'email' | 'cpf' | 'createdAt' | 'updatedAt'>
}

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
