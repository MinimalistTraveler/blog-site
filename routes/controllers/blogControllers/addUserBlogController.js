const db = require("../../../database/index");
module.exports = async (req, res) => {
  const { title, body } = req.body;
  // Generate New Blog
  const newBlog = {
    title: title,
    post: body,
    authorid: req.user.id,
    datecreated: new Date()
  };
  const addedBlog = await db("blogs")
    .insert(newBlog)
    .returning("*");

  return res.status(200).send(addedBlog);
};
