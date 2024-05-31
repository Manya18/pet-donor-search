const db = require('../db');

class BloodTypeController {
    async getBloodTypes (req, res) {
        const petTypeId = req.params.id;
        const bloodTypes = await db.query(`SELECT * FROM blood_type WHERE pet_type_id=$1;`, [petTypeId]);
        res.json(bloodTypes.rows);
    }
}

module.exports = new BloodTypeController();