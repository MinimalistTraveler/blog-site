const db = require("../../../database/index");
const { validationResult } = require("express-validator/check");
const updateBlog = async (req, title, body) => {
  try {
    const updateBlog = await db("blogs")
      .select("*")
      .where("blogid", req.params.id)
      .andWhere("authorid", req.user.id)
      .update({ title, post: body })
      .returning("*");

    return updateBlog;
  } catch (e) {
    return { error: e.message };
  }
};

module.exports = async (req, res) => {
  const { title, body } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(400).json({ errors: errors.array() });
  }
  // Update the blog
  const update = await updateBlog(req, title, body);
  console.log(update);
  return res.status(200).json(update);
};
