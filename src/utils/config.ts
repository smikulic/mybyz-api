import dotenv from 'dotenv'

dotenv.config()

interface Iconfig {
  fakeUserId: String
}

const config: Iconfig = {
  fakeUserId: '1309b9f5-801d-49ee-8da6-a8c579773836', // first user in db
  // fakeUserId: '4fbd36af-f77f-4e3e-991e-de61cb00dc92', // second user in db
}

export default config
