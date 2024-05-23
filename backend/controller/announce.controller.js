const db = require('../db');
const bcrypt = require('bcryptjs');

class AnnounceController {
    async getAnnounceSearch(req, res) {
        const id = req.params.id;
        //const user = await db.query(`SELECT * FROM Announce_search;`);
        const user = await db.query(`SELECT * FROM announce_search WHERE id = $1;`, [id]);
        res.json(user.rows[0]);
    }
}

module.exports = new AnnounceController();