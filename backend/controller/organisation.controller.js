const db = require('../db');

class OrganisationController {
    async getOrganisationForUser (req, res) {
        const userID = req.params.id;
        const orgID = await db.query(`SELECT id FROM Organisation WHERE user_id = $1;`, [userID]);
        res.json(orgID.rows[0]);
    }
}

module.exports = new OrganisationController();