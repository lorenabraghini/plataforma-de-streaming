const {select} = require('../../common/Database/helpers.js')  
async function index(req, res) {
  let x = await select('Playlist')
  res.send({playlists:x})
}
module.exports = {
  index
};
