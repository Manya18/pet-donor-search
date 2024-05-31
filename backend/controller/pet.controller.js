const db = require('../db');

class PetController {
    async createPet (req, res) {
        const {user_id, pet_type_id, blood_type_id, pet_name, breed_id, photo_url} = req.body;
        const newPet = await db.query(`INSERT INTO pet (user_id, pet_type_id, blood_type_id, pet_name, breed_id, photo_url) VALUES($1, $2, $3, $4, $5, $6) RETURNING *;`, [user_id, pet_type_id, blood_type_id, pet_name, breed_id, photo_url]);
        res.json(newPet.rows[0]);
    }

    async getPets (req, res) {
        const id = req.params.id;
        const pets = await db.query(`SELECT * FROM pet WHERE user_id=$1;`, [id]);
        res.json(pets.rows);
    }

    async getPet (req, res) {
        const id = req.params.id;
        const pet = await db.query(`SELECT * FROM pet WHERE id=$1;`, [id]);
        res.json(pet.rows[0]);
    }

    async updatePet (req, res) {
        const id = req.params.id;
        const {pet_type_id, blood_type_id, pet_name, breed_id, photo_url} = req.body;
        const pet = await db.query(`UPDATE pet SET pet_type_id=$1, blood_type_id=$2, pet_name=$3, breed_id=$4, photo_url=$5 WHERE id=$6 RETURNING *;`, [pet_type_id, blood_type_id, pet_name, breed_id, photo_url, id]);
        res.json(pet.rows[0]);
    }

    async deletePet (req, res) {
        const id = req.params.id;
        const pet = await db.query(`DELETE FROM pet WHERE id=$1 RETURNING *;`, [id]);
        res.json(pet.rows[0]);
    }
}

module.exports = new PetController();