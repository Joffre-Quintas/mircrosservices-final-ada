import app from './app'
import 'dotenv/config'

const port = process.env.PORT ?? 3001

app.listen(port, () => console.log(`Servidor rodando na porta ::${port}::`))
