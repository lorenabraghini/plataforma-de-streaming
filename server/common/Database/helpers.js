const sql = require('mssql')

const sqlConfig = {
    user: "BD",
    password: "epbancodedados",
    database: "Streaming",
    server: 'localhost',
    port: 1433,
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000
    },
    options: {
      encrypt: false, // for azure
      trustServerCertificate: true // change to true for local dev / self-signed certs
    }
  }

async function conectar () {
    const x = await sql.connect(sqlConfig)
    console.log(x)
}
//conectar()

function addMusica(musica){
    return new Promise(async (resolve, reject) => {
        try {
            const db = await sql.connect(sqlConfig)
            await db.request().query(`INSERT INTO [Musica] VALUES (${musica.id}, '${musica.nome}', '${musica.url}', ${musica.duracao}, ${musica.popularidade}, '${musica.genero}')`)
            resolve()
        } catch (error) {
            reject(error)
        }
    })
}
async function teste(){
    await addMusica({})
}

teste()