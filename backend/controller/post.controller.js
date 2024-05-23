const db = require('../db');

class PostController {
    async createPost(req, res) {
        const {user_id, Advice_date, Advice_text, admin_accept} = req.body;
        try {
            const newPost = await db.query(`INSERT INTO advice (user_id, Advice_date, Advice_text, admin_accept) values ($1, $2, $3, $4) RETURNING *;`, [user_id, Advice_date, Advice_text, admin_accept]);
            res.json(newPost.rows[0]);
        } catch(e) {
            return res.status(400).json({message: 'Совет уже существует'});
        }
    }
    async getPost(req, res) {
        const Post = await db.query(`SELECT * FROM post`);
        res.json(Post.rows);
    }
    async updatePost(req, res) {

    }
    async deletePost(req, res) {
        const id = req.params.id;
        const New = await db.query(`DELETE FROM advice WHERE id = $1 RETURNING *;`, [id]);
        res.json(Advice.rows[0]);
    }
}

module.exports = new PostController();