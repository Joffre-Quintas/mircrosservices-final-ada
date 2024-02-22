// user
export type TUser = {
  id: string
  email: string
  name: string
  cpf: string
  addressId: string
  address?: TAddress
  password: string
  createdAt: Date
  updatedAt: Date
}

// address
export type TAddress = {
  id: string
  neighborhood: string
  city: string
  state: string
  country: string
  cep: string
  street: string
  number: string
  complement: string
}

// user DTOs and responses
export type TCreateUserDTO = Omit<TUser, 'id' | 'createdAt' | 'updatedAt' | 'address'> & { confirmPassword?: string }

export type TCreateUserResponse = {
  data: Omit<TUser, 'password' | 'addressId' | 'id'> & { message: string }
}

export type TFindAllUsersResponse = {
  data: Omit<TUser, 'password' | 'addressId'>[]
}

export type TqueueDTO = {
  queue: string
  message: {
    userId: string
    name: string
    email: string
    queue: string
  }
}

// services
export interface IServiceCreateUser {
  execute: (data: TCreateUserDTO) => Promise<TCreateUserResponse>
}
export interface IServiceFindAllUsers {
  execute: () => Promise<TFindAllUsersResponse>
}
export interface IServiceDeleteAllUsers {
  execute: () => Promise<void>
}
export interface IQueueService {
  publish: (data: TqueueDTO) => void
}

// repository
export interface IRepository {
  createUser: (data: TCreateUserDTO) => Promise<TUser>
  findAllUsers: () => Promise<TUser[]>
  deleteAllUsers: () => Promise<void>
  findUserByCPF: (cpf: string) => Promise<TUser>
  findUserByEmail: (email: string) => Promise<TUser>

  findAddressById: (id: string) => Promise<TAddress>
}

// exceptions
export interface IException {
  message: string
  status: number
  name: string
}
