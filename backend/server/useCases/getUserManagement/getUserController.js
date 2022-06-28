const { getUser } = require("../../common/Database/helpers.js");
async function index(req, res) {
  let result = await getUser(req.body.user);
  res.send({ user: result[0] });
}
module.exports = {
  index,
};
