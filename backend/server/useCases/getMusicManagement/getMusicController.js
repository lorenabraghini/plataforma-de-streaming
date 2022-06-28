const { select } = require("../../common/Database/helpers.js");
async function index(req, res) {
  let x = await select("MusicaMetadata");
  res.send({ musicas: x });
}
module.exports = {
  index,
};
