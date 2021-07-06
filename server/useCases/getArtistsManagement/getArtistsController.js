const {select} = require('../../common/Database/helpers.js')  
async function index(req, res) {
  let x = await select('Artista')
  res.send({artistas:x})
}
module.exports = {
  index
};
