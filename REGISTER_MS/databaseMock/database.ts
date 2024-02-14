// databaseMock/database.ts

export const database = {
  users: [
    {
      id: '1',
      name: 'John',
      email: '',
      cpf: '',
      streetNumber: 0,
      neighborhood: '',
      city: '',
      state: '',
      country: '',
      password: '',
    }
  ],
  orders: [
    {
      id: '1',
      userId: '1',
      products: [
        {
          id: '1',
          name: 'product1',
          price: 100,
          description: 'description'
        }
      ]
    }
  ]
}
