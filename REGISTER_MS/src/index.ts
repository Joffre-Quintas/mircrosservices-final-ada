import 'dotenv/config'
import app from './app'

const port = process.env.PORT ?? 3004

app.listen(port, () => console.log(`Servidor rodando na porta ::${port}::`))
