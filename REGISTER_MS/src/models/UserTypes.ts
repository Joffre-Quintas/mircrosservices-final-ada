export type TUserData = {
  id?: string
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

export type TUser = {
  id: string
} & TUserData

export interface IUserRepository {
  createUser: (data: TUserData) => Promise<TUser>
}

export interface IServiceCreateUser {
  execute: (data: TUserData) => Promise<TUserData>
}
