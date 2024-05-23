const db = require('../db');
const bcrypt = require('bcryptjs');

class AnnounceController {

    async getAnimalTypes(req, res) {
        const advise = await db.query(`SELECT * FROM pet_type`);
        res.json(advise.rows);
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
            res.status(500).send('Server error');
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
            res.status(500).send('Server error');
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
            res.status(500).send('Server error');
        }
    }
}

module.exports = new AnnounceController();
