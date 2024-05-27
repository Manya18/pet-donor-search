const db = require("../db");

class PostController {
  async createPost(req, res) {
    const { admin_id, post_name, post_text, org_id, post_link } = req.body;
    try {
      const newPost = await db.query(
        `INSERT INTO post (admin_id, post_name, post_text, org_id, post_link) values ($1, $2, $3, $4, $5) RETURNING *;`,
        [admin_id, post_name, post_text, org_id, post_link]
      );
      res.json(newPost.rows[0]);
    } catch (e) {
      return res.status(400).json({ message: "Не удалось создать пост" });
    }
  }
  async getPost(req, res) {
    const Post = await db.query(`SELECT * FROM post`);
    res.json(Post.rows);
  }
  async updatePost(req, res) {}
  async deletePost(req, res) {
    const id = req.params.id;
    const New = await db.query(`DELETE FROM post WHERE id = $1 RETURNING *;`, [
      id,
    ]);
    res.json(New.rows[0]);
  }
}

module.exports = new PostController();
