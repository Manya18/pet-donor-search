const db = require('../db');

class BreedController {
    async getBreeds (req, res) {
        const petTypeId = req.params.id;
        const breeds = await db.query(`SELECT * FROM breed WHERE pet_type_id=$1;`, [petTypeId]);
        res.json(breeds.rows);
    }
}

module.exports = new BreedController();