const db = require('../db');
const bcrypt = require('bcryptjs');

class UserController {
    async creatUser(req, res) {
        const {email, password} = req.body;
        var hashPassword = bcrypt.hashSync(password, 8);
        const newUser = await db.query(`INSERT INTO Users (email, password) values ($1, $2) RETURNING *;`, [email, hashPassword]);
        res.json(newUser.rows[0]);
    }
    async getUser(req, res) {
        const id = req.params.id;
        const user = await db.query(`SELECT * FROM Users WHERE id = $1;`, [id]);
        res.json(user.rows[0]);
    }
    async updateUser(req, res) {

    }
    async deleteUser(req, res) {
        const id = req.params.id;
        const user = await db.query(`DELETE FROM Users WHERE id = $1 RETURNING *;`, [id]);
        res.json(user.rows[0]);
    }
    async login(req, res) {
        const param = req.query.param;
        res.json(param);
        // const email = param[0];
        // const password = param[1];
        // const userID = await db.query(`SELECT id FROM Users WHERE email = $1`, [email]);
        // const userPassword = await db.query(`SELECT password FROM Users WHERE email = $1`, [email]);
        // if(userID.rows.length == 1) {
        //     if(bcrypt.compareSync(password, userPassword.rows[0].password)) {
        //         res.json(userID.rows[0]);
        //     }
        //     else return res.status(400).json({message: 'Неверный логин или пароль'});
        // }
        // else return res.status(400).json({message: 'Неверный логин или пароль'});
    }
}

module.exports = new UserController();