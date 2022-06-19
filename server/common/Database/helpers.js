const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "159.122.187.36",
  port: 31469,
  user: "newuser",
  password: "password",
  database: "streaming",
});

function handleData(data) {
  let values = "";
  Object.entries(data).map(([key, value]) => {
    if (values !== "") values += ", ";
    if (typeof value === "string") values += `'${value}'`;
    else if (typeof value === "object" || !value) values += "null";
    else values += `${value}`;
  });
  console.log(values);
  return values;
}

function inserir(tabela, data) {
  return new Promise(async (resolve, reject) => {
    try {
      const values = handleData(data);
      connection.query(
        `INSERT INTO ${tabela} VALUES (${values})`,
        (err, rows, fields) => {
          return resolve("Incluido");
        }
      );
    } catch (error) {
      reject(error);
    }
  });
}

function select(tabela) {
  return new Promise(async (resolve, reject) => {
    try {
      connection.query(`SELECT * FROM ${tabela}`, (err, rows, fields) => {
        return resolve(rows);
      });
    } catch (error) {
      reject(error);
    }
  });
}
function getUser(user) {
  return new Promise(async (resolve, reject) => {
    try {
      connection.query(
        `SELECT * FROM Usuario WHERE login='${user}'`,
        (err, rows, fields) => {
          return resolve(rows);
        }
      );
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = { inserir, select, getUser };
