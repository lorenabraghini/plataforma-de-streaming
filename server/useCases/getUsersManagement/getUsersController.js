const {select} = require('../../common/Database/helpers.js')  
async function index(req, res) {
  let x = await select('Usuario')
  res.send({usuarios:x})
}
module.exports = {
  index
};
