const db = require("../../../database/index");

module.exports = async (req, res) => {
  // Get all the blog posts of the matching user
  const userBlogs = await db("blogs")
    .select("*")
    .where("authorid", req.user.id)
    .returning("*");
  if (JSON.stringify(userBlogs) === "[]") {
    return res.status(404).json({ error: "Not Blog List Created" });
  }
  return res.status(200).json(userBlogs);
};
