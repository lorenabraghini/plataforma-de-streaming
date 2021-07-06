const {select} = require('../../common/Database/helpers.js')  
async function index(req, res) {
  let x = await select('Album')
  res.send({albuns:x})
}
module.exports = {
  index
};
