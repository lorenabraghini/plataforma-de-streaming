const {select} = require('../../common/Database/helpers.js')  
async function index(req, res) {
  let x = await select('Artista')
  res.send({artist:x})
}

async function insert(req, res) {}

module.exports = {
  index,
  insert,
};
