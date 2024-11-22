
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const pollRoutes = require('./routes/pollRoutes');
const { setupWebSocket } = require('./services/websocketService');

const app = express();
const server = http.createServer(app);

setupWebSocket(server);

app.use(bodyParser.json());
app.use('/api', pollRoutes);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
                