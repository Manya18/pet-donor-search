const db = require('../db');
const bcrypt = require('bcryptjs');

class AdviceController {
    async createAdvice(req, res) {
        const {user_id, Advice_date, Advice_text, admin_accept} = req.body;
        try {
            const newAdvice = await db.query(`INSERT INTO advice (user_id, Advice_date, Advice_text, admin_accept) values ($1, $2, $3, $4) RETURNING *;`, [user_id, Advice_date, Advice_text, admin_accept]);
            res.json(newAdvice.rows[0]);
        } catch(e) {
            return res.status(400).json({message: 'Совет уже существует'});
        }
    }
    async getAdvices(req, res) {
        const Advice = await db.query(`SELECT 
        advice.id AS advice_id,
        advice.user_id,
        advice.advice_date,
        advice.advice_text,
        advice.admin_accept,
        users.id AS user_id,
        users.name AS user_name,
        users.surname AS user_surname
    FROM 
        advice
    INNER JOIN 
        users ON advice.user_id = users.id;`);
        res.json(Advice.rows);
    }
    async updateAdvice(req, res) {

    }
    async deleteAdvice(req, res) {
        const id = req.params.id;
        const Advice = await db.query(`DELETE FROM advice WHERE id = $1 RETURNING *;`, [id]);
        res.json(Advice.rows[0]);
    }
}

module.exports = new AdviceController();