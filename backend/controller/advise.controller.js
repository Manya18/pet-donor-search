const db = require('../db');
const bcrypt = require('bcryptjs');

class AdviseController {
    async createAdvise(req, res) {
        const {user_id, advise_date, advise_text, admin_accept} = req.body;
        try {
            const newAdvise = await db.query(`INSERT INTO Advise (user_id, advise_date, advise_text, admin_accept) values ($1, $2, $3, $4) RETURNING *;`, [user_id, advise_date, advise_text, admin_accept]);
            res.json(newAdvise.rows[0]);
        } catch(e) {
            return res.status(400).json({message: 'Совет уже существует'});
        }
    }
    async getAdvises(req, res) {
        const advise = await db.query(`SELECT * FROM Advise`);
        res.json(advise.rows);
    }
    async updateAdvise(req, res) {

    }
    async deleteAdvise(req, res) {
        const id = req.params.id;
        const advise = await db.query(`DELETE FROM Advise WHERE id = $1 RETURNING *;`, [id]);
        res.json(advise.rows[0]);
    }
}

module.exports = new AdviseController();