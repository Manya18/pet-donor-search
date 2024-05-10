const db = require('../db');

class UserController {
    async creatUser(req, res) {
        const {email, password} = req.body;
        const newUser = await db.query(`INSERT INTO Users (email, password) values ($1, $2) RETURNING *;`, [email, password]);
        res.json(newUser.rows[0]);
    }
    async getUser(req, res) {
        const id = req.params.id;
        const user = await db.query(`SELECT * FROM Users WHERE id = $1;`, [id]);
        res.json(user.rows[0]);
    }
    async updateUser(req, res) {

    }
    async deleteUser(req, res) {
        const id = req.params.id;
        const user = await db.query(`DELETE FROM Users WHERE id = $1 RETURNING *;`, [id]);
        res.json(user.rows[0]);
    }
    async getUserID(req, res) {
        const {email, password} = req.body;
        const userID = await db.query(`SELECT id FROM Users WHERE email = $1 and password = $2`, [email, password]);
        res.json(userID.rows[0]);
    }
}

module.exports = new UserController();