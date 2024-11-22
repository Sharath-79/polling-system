
import { Server } from 'ws';

let clients = [];

function setupWebSocket(server) {
  const wss = new Server({ server });

  wss.on('connection', (ws) => {
    console.log('New client connected.');
    clients.push(ws);

    ws.on('close', () => {
      clients = clients.filter((client) => client !== ws);
    });
  });
}

function broadcastUpdate(update) {
  clients.forEach((ws) => {
    ws.send(JSON.stringify(update));
  });
}

export default { setupWebSocket, broadcastUpdate };
                