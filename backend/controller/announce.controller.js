const db = require('../db');
const bcrypt = require('bcryptjs');

class AnnounceController {
    async getAnimalTypes(req, res) {
        try {
            const advise = await db.query(`SELECT * FROM pet_type`);
            res.json(advise.rows);
        } catch (error) {
            res.status(500).send('Типы животных не найдены');
        }
    }

    async getTypes(req, res) {
        try {
            const advise = await db.query(`SELECT * FROM blood_type`);
            res.json(advise.rows);
        } catch (error) {
            res.status(500).send('Типы животных не найдены');
        }
    }

    async getOrganisation(req, res) {
        try {
            const advise = await db.query(`SELECT * FROM organisation`);
            res.json(advise.rows);
        } catch (error) {
            res.status(500).send('Типы животных не найдены');
        }
    }

    async getUrgency(req, res) {
        try {
            const user = await db.query(`SELECT  
            a.id, 
            a.announce_text, 
            a.period, 
            a.hidden, 
            a.admin_id, 
            p.pet_name, 
            pt.pet_name as animaltype, 
            bt.blood_type as bloodtype, 
            o.name as organization, 
            o.address, 
            CONCAT(om.opening_time, ' - ', om.closing_time) as workinghours,
            p.photo_url as photo,
            a.urgency
        FROM 
            Announce_search a
        JOIN 
            Pet p ON a.pet_id = p.id
        JOIN 
            Pet_type pt ON p.pet_type_id = pt.id
        JOIN 
            Blood_type bt ON p.blood_type_id = bt.id
        JOIN 
            Organisation o ON a.org_id = o.id
        JOIN 
            Operating_mode om ON a.org_id = om.org_id
        WHERE 
            a.urgency = true;
            `);

            res.json(user.rows);
        } catch (error) {
            res.status(500).send('Срочные объявления не найдены');
        }
    }
    async getAnnounceSearch(req, res) {
        try {
            const user = await db.query(`SELECT 
                a.id,
                a.pet_id,
                a.urgency,
                a.org_id,
                a.announce_text,
                a.period,
                a.hidden,
                a.admin_id,
                pt.pet_name AS animalType,
                bt.blood_type AS bloodType,
                o.name AS organization,
                o.address,
                CONCAT(om.opening_time, ' - ', om.closing_time) AS workingHours,
                p.photo_url AS photo,
                p.pet_name AS petName
            FROM 
                Announce_search a
            JOIN 
                Pet p ON a.pet_id = p.id
            JOIN 
                Pet_type pt ON p.pet_type_id = pt.id
            JOIN 
                Blood_type bt ON p.blood_type_id = bt.id
            JOIN 
                Organisation o ON a.org_id = o.id
            JOIN 
                Operating_mode om ON o.id = om.org_id;
            `);

            res.json(user.rows);
        } catch (error) {
            res.status(500).send('Объявления не найдены');
        }
    }

    async getAnnouncement(req, res) {
        const id = req.params.id;
        try {
            const user = await db.query(`
                SELECT 
                    a.id,
                    a.pet_id,
                    a.urgency,
                    a.org_id,
                    a.announce_text,
                    a.period,
                    a.hidden,
                    a.admin_id,
                    pt.pet_name AS animalType,
                    bt.blood_type AS bloodType,
                    o.name AS organization,
                    o.address,
                    CONCAT(om.opening_time, ' - ', om.closing_time) AS workingHours,
                    p.photo_url AS photo,
                    p.pet_name AS petName
                FROM 
                    Announce_search a
                JOIN 
                    Pet p ON a.pet_id = p.id
                JOIN 
                    Pet_type pt ON p.pet_type_id = pt.id
                JOIN 
                    Blood_type bt ON p.blood_type_id = bt.id
                JOIN 
                    Organisation o ON a.org_id = o.id
                JOIN 
                    Operating_mode om ON o.id = om.org_id
                WHERE 
                    a.id = $1;
            `, [id]);

            if (user.rows.length > 0) {
                res.json(user.rows[0]);
            } else {
                res.status(404).send('Announcement not found');
            }
        } catch (error) {
            res.status(500).send(`Объявление с id=${id} не найдено`);
        }
    }
    async getBloodTypes(req, res) {
        const pet_type_id = req.params.pet_type_id;
        try {
            const result = await db.query(`
                SELECT 
                    id, pet_type_id, blood_type
                FROM 
                    blood_type
                WHERE 
                    pet_type_id = $1;
            `, [pet_type_id]);
            if (result.rows.length > 0) {
                res.json(result.rows);
            } else {
                res.status(404).send('Blood types not found');
            }
        } catch (error) {
            res.status(500).send(`Ошибка при получении типов крови: ${error.message}`);
        }
    }

    async createAnnounce(req, res) {
        const { user_id, pet_type_id, blood_type_id, pet_name, breed_id, photo_url, announce_text, org_id, admin_id, urgency, period } = req.body;
        try {
            // Вставка питомца
            const petResult = await db.query(`
                    INSERT INTO public.pet (user_id, pet_type_id, blood_type_id, pet_name, breed_id, photo_url)
                    VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;
                `, [user_id, pet_type_id, blood_type_id, pet_name, breed_id, photo_url]);

            const pet_id = petResult.rows[0].id;

            // Вставка объявления
            const announceResult = await db.query(`
                    INSERT INTO public.announce_search (pet_id, urgency, org_id, announce_text, period, hidden, admin_id)
                    VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;
                `, [pet_id, urgency, org_id, announce_text, period, true, admin_id]);

            console.log("bloodtypes", petResult, announceResult)

            res.status(201).json({ pet: petResult.rows[0], announce: announceResult.rows[0] });
        } catch (error) {
            console.log("blood")
            res.status(500).send(`Ошибка при создании питомца и объявления: ${error.message}`);
        }
    };

    async deleteAnnounce(req, res) {
        const id = req.params.id;
        try {
            const user = await db.query(`DELETE FROM Announce_search WHERE id = $1 RETURNING *;`,
                [id]);
            if (user.rows.length > 0) {
                res.json(user.rows[0]);
            } else {
                res.status(404).send('Announcement not found');
            }
        } catch (error) {
            res.status(500).send('Server error');
        }
    }

}

module.exports = new AnnounceController();
