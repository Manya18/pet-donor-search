const db = require("../db");

class EventController {
  async createEvent(req, res) {
    const { user_id, Advice_date, Advice_text, admin_accept } = req.body;
    try {
      const newPost = await db.query(
        `INSERT INTO advice (user_id, Advice_date, Advice_text, admin_accept) values ($1, $2, $3, $4) RETURNING *;`,
        [user_id, Advice_date, Advice_text, admin_accept]
      );
      res.json(newPost.rows[0]);
    } catch (e) {
      return res.status(400).json({ message: "Совет уже существует" });
    }
  }
  async getEvents(req, res) {
    const Events = await db.query(`SELECT
        events.id,
        events.admin_id,
        events.event_date,
        events.address,
        events.goal,
        events.org_id,
        events.title,
        organisation.name AS organisation_name
    FROM
        events
    INNER JOIN
        organisation ON events.org_id = organisation.id;`);
    res.json(Events.rows);
  }
  async updateEvent(req, res) {}
  async deleteEvent(req, res) {
    const id = req.params.id;
    const New = await db.query(
      `DELETE FROM advice WHERE id = $1 RETURNING *;`,
      [id]
    );
    res.json(Advice.rows[0]);
  }
}

module.exports = new EventController();
