
import { query } from '../db/connection';

async function createPoll(title, options) {
  const res = await query(
    'INSERT INTO polls (title, options) VALUES ($1, $2) RETURNING *',
    [title, JSON.stringify(options)]
  );
  return res.rows[0];
}

async function votePoll(id, option) {
  const res = await query(
    'UPDATE polls SET votes = votes || $2 WHERE id = $1 RETURNING *',
    [id, JSON.stringify({ [option]: 1 })]
  );
  return res.rows[0];
}

async function getPoll(id) {
  const res = await query('SELECT * FROM polls WHERE id = $1', [id]);
  return res.rows[0];
}

export default { createPoll, votePoll, getPoll };
                