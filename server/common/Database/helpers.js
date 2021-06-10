const sql = require("mssql");

const sqlConfig = {
  user: "BD",
  password: "epbancodedados",
  database: "Streaming",
  server: "localhost",
  // port: 1433,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

async function conectar() {
  const x = await sql.connect(sqlConfig);
  console.log(x);
}
//conectar()
function handleData(data){
    let values = ''
    Object.entries(data).map(([key,value]) => {
        if(values !== '') values += ', '
        if(typeof value === "string") values+= `'${value}'`
        else if(typeof value === 'object' || !value) values += 'null';
        else values += `${value}`
    })
    console.log(values)
    return values
}

function inserir(tabela, data){
    return new Promise(async (resolve, reject) => {
        try {
            const values = handleData(data)
            const db = await sql.connect(sqlConfig)
            await db.request().query(`INSERT INTO [${tabela}] VALUES (${values})`)
            resolve()
        } catch (error) {
            reject(error)
        }
    })
}
function select(tabela){
    return new Promise(async (resolve, reject) => {
        try {
            const db = await sql.connect(sqlConfig)
            const res = await db.request().query(`SELECT * FROM ${tabela}`)
            console.log(res)
            resolve(res)
        } catch (error) {
            reject(error)
        }
    })
}
select("Playlist")
module.exports = {inserir}
