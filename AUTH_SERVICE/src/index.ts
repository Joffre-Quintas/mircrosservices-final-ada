import app from './app'
import 'dotenv/config'
import dbConection from './db'

const port = process.env.PORT ?? 3001

dbConection()
app.listen(port, () => console.log(`Server is running on port ::${port}::`))
