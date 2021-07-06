const {select} = require('../../common/Database/helpers.js')  
async function index(req, res) {
  let x = await select('EpisodioPodcast')
  res.send({episodios:x})
}
module.exports = {
  index
};
