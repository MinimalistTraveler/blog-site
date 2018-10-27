const db = require("../../database/index");

module.exports = async (req, res) => {
  // Delete the User by id
  const deletedUser = await db("users")
    .del()
    .where(builder => builder.where("id", req.params.id))
    .andWhere(builder => builder.where("email", req.user.email))
    .returning("*");
  // Remember to delete the token for LS and log them out.
  return res.status(200).json(deletedUser);
};
