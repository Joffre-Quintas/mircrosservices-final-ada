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

export interface IServiceCreateUser {
  execute: (data: TCreateUserDTO) => Promise<Partial<TCreateUserResponse>>
}

// delete all users
export interface IServiceDeleteAllUsers {
  execute: () => Promise<void>
}

// repositories
export interface IUserRepository {
  createUser: (data: TCreateUserDTO) => Promise<TUser>
  deleteAllUsers: () => Promise<boolean | void >
  findByCPF: (cpf: string) => Promise<TUser | false>
  findByEmail: (email: string) => Promise<TUser | false>
}

// queue service
export type TqueueDTO = {
  exchange?: string
  routingKey?: string
  message?: string
}
export interface IQueueService {
  publish: (data: TqueueDTO) => Promise<void>
}

// exceptions
export interface IException {
  message: string
  status: number
  name: string
}
