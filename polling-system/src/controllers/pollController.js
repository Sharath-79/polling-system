
import { createPoll, votePoll, getPoll } from '../models/Poll';
import { producer } from '../services/kafkaService';
import { broadcastUpdate } from '../services/websocketService';

async function createPollHandler(req, res) {
  const { title, options } = req.body;
  const poll = await createPoll(title, options);
  res.status(201).json(poll);
}

async function voteHandler(req, res) {
  const { id } = req.params;
  const { option } = req.body;

  producer.send([{ topic: 'votes', messages: JSON.stringify({ id, option }) }], (err) => {
    if (err) return res.status(500).send('Failed to send vote.');
    res.status(200).send('Vote submitted.');
  });
}

async function getPollHandler(req, res) {
  const poll = await getPoll(req.params.id);
  res.json(poll);
}

export default { createPollHandler, voteHandler, getPollHandler };
                