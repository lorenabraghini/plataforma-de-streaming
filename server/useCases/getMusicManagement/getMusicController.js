const { select } = require("../../common/Database/helpers.js");
async function index(req, res) {
  let x = await select("Musica");
  res.send({ musicas: x });
}
module.exports = {
  index,
};
