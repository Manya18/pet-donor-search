const db = require('../db');
const bcrypt = require('bcryptjs');

class LocalityController {
    async getLocalities(req, res) {
        const localities = await db.query(`SELECT * FROM Locality;`);
        res.json(localities.rows);
    }
}

module.exports = new LocalityController();