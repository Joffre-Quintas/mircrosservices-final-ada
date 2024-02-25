import app from './app'
import 'dotenv/config'
import dbConnection from './db/index'

const port = process.env.PORT ?? 3002

dbConnection().catch(error => console.error('Failed to connect to the database:', error));

app.listen(port, () => console.log(`Servidor rodando na porta ::${port}::`))
