const {select} = require('../../common/Database/helpers.js')  
async function index(req, res) {
  let x = await select('Podcast')
  res.send({podcasts:x})
}
module.exports = {
  index
};
