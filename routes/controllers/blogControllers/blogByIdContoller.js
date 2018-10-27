const db = require("../../../database/index");

module.exports = async (req, res) => {
  try {
    const selectBlog = await db("blogs")
      .where("authorid", req.user.id)
      .andWhere("blogid", req.params.id)
      .returning("*");

    if (JSON.stringify(selectBlog) === "[]") {
      return res.status(404).json({ error: "No blog found" });
    }
    return res.status(200).json(selectBlog[0]);
  } catch (e) {
    console.log(e.message);
    return res.status(400).json({ error: e.message });
  }
};
