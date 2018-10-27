const db = require("../../../database/index");

module.exports = async (req, res) => {
  // Find the blog with the id.
  try {
    const deletedBlog = await db("blogs")
      .del()
      .where("blogid", req.params.id)
      .andWhere("authorid", req.user.id)
      .returning("*");
    return res.status(200).json(deletedBlog);
  } catch (e) {
    return { error: "Unable to delete this blog" };
  }
};
