// user
export type TUser = {
  id: string
  email: string
  name: string
  cpf: string
  // streetNumber: number
  // neighborhood: string
  // city: string
  // state: string
  // country: string
  addressId: string
  address?: TAddress
  password: string
  createdAt: Date
  updatedAt: Date
}

// address
export type TAddress = {
  id: string
  streetNumber: string
  neighborhood: string
  city: string
  state: string
  country: string
}

// user DTOs and responses
export type TCreateUserDTO = Omit<TUser, 'id' | 'createdAt' | 'updatedAt' | 'address' > & { confirmPassword?: string }

export type TCreateUserResponse = {
  data: Pick<TUser, 'name' | 'email' | 'cpf' | 'createdAt' | 'updatedAt'>
}
export type TFindAllUsersResponse = {
  data: Omit<TUser, 'password' | 'addressId'>[]
}

// services
export interface IServiceCreateUser {
  execute: (data: TCreateUserDTO) => Promise<Partial<TCreateUserResponse>>
}

export interface IServiceFindAllUsers {
  execute: () => Promise<TFindAllUsersResponse>
}

export interface IServiceDeleteAllUsers {
  execute: () => Promise<void>
}

// repositories
export interface IRepository {
  createUser: (data: TCreateUserDTO) => Promise<TUser>
  findAllUsers: () => Promise<TUser[]>
  deleteAllUsers: () => Promise<void>
  findUserByCPF: (cpf: string) => Promise<TUser>
  findUserByEmail: (email: string) => Promise<TUser>

  findAddressById: (id: string) => Promise<TAddress>
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
