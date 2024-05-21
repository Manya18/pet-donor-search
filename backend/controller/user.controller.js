const db = require('../db');
const bcrypt = require('bcryptjs');

class UserController {
    async creatUser(req, res) {
        const {email, password} = req.body;
        var hashPassword = bcrypt.hashSync(password, 8);
        try {
            const newUser = await db.query(`INSERT INTO Users (email, password) values ($1, $2) RETURNING *;`, [email, hashPassword]);
            res.json(newUser.rows[0]);
        } catch(e) {
            return res.status(400).json({message: 'Пользователь уже существует'});
        }
    }
    async getUser(req, res) {
        const id = req.params.id;
        const user = await db.query(`SELECT * FROM Users WHERE id = $1;`, [id]);
        res.json(user.rows[0]);
    }
    async updateUser(req, res) {
        const id = req.params.id;
        const {email, phone, tg_nickname, surname, name, patronymic, locality_id} = req.body;
        try {
            const userData = await db.query(`UPDATE Users SET email=$1, phone=$2, tg_nickname=$3, surname=$4, name=$5, patronymic=$6, locality_id=$7 WHERE id=$8 RETURNING *;`, [email, phone, tg_nickname, surname, name, patronymic, locality_id, id]);
            res.json(userData.rows[0]);
        } catch(e) {
            return res.status(400).json({message: 'Параметры введены неверно'});
        }
    }
    async deleteUser(req, res) {
        const id = req.params.id;
        const user = await db.query(`DELETE FROM Users WHERE id = $1 RETURNING *;`, [id]);
        res.json(user.rows[0]);
    }
    async login(req, res) {
        const { email, password } = req.query;
        const userID = await db.query(`SELECT id FROM Users WHERE email = $1`, [email]);
        const userPassword = await db.query(`SELECT password FROM Users WHERE email = $1`, [email]);
        if(userID.rowCount == 1) {
            if(bcrypt.compareSync(password, userPassword.rows[0].password)) {
                res.json(userID.rows[0]);
            }
            else return res.status(400).json({message: 'Неверный логин или пароль'});
        }
        else return res.status(400).json({message: 'Неверный логин или пароль'});
    }
}

module.exports = new UserController();