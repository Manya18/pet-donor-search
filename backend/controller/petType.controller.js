const db = require('../db');

class PetTypeController {
    async getPetTypes (req, res) {
        const petTypes = await db.query(`SELECT * FROM pet_type;`);
        res.json(petTypes.rows);
    }
}

module.exports = new PetTypeController();