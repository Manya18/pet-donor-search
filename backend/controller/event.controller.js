const db = require("../db");

class EventController {
  async createEvent(req, res) {
    const { admin_id, event_date, address, goal, org_id, title } = req.body;
    try {
      const newPost = await db.query(
        `INSERT INTO events (admin_id, event_date, address, goal, org_id, title) values ($1, $2, $3, $4, $5, $6) RETURNING *;`,
        [admin_id, event_date, address, goal, org_id, title]
      );
      res.json(newPost.rows[0]);
    } catch (e) {
      return res.status(400).json({ message: "Совет уже существует", e });
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
    const Event = await db.query(
      `DELETE FROM events WHERE id = $1 RETURNING *;`,
      [id]
    );
    res.json(Event.rows[0]);
  }
}

module.exports = new EventController();
