const { inserir } = require("../../common/Database/helpers.js");
async function index(req, res) {
  await inserir(req.body.tabela, req.body.elemento);
  res.send("playlist inserida com sucesso");
}
module.exports = {
  index,
};
