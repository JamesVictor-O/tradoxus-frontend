const WebSocket = require('ws');
const http = require('http');
const winston = require('winston');
const fs = require('fs');
const path = require('path');

// Read coin pairs from assets.json at the project root
const assetsPath = path.join(__dirname, 'assets.json');
const COIN_PAIRS = JSON.parse(fs.readFileSync(assetsPath, 'utf-8'));
const streams = COIN_PAIRS.map(s => `${s}@ticker`).join('/');
const BINANCE_WS_URL = `wss://stream.binance.com:9443/stream?streams=${streams}`;

// Logging setup
const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => `${timestamp} [${level}]: ${message}`)
  )
});

// WebSocket server for frontend clients
const server = http.createServer();
const wss = new WebSocket.Server({ server });

let clients = [];
let clientSelectedSymbol = new Map(); // ws -> symbol

// Connect to Binance multi-stream
let binanceWS = new WebSocket(BINANCE_WS_URL);

binanceWS.on('open', () => {
  logger.info('Connected to Binance multi-stream WS');
});

binanceWS.on('message', data => {
  try {
    const msg = JSON.parse(data);
    if (!msg || !msg.data) return;
    const { s: symbol, c: price, E: timestamp, P: change24h } = msg.data;
    const update = { symbol: symbol.toLowerCase(), price, timestamp, change24h };
    clients.forEach(ws => {
      if (ws.readyState === WebSocket.OPEN && clientSelectedSymbol.get(ws) === symbol.toLowerCase()) {
        ws.send(JSON.stringify(update));
      }
    });
  } catch (err) {
    logger.error('Error parsing Binance message: ' + err.message);
  }
});

binanceWS.on('close', () => {
  logger.warn('Binance WS closed, reconnecting in 5s...');
  setTimeout(() => {
    binanceWS = new WebSocket(BINANCE_WS_URL);
  }, 5000);
});

binanceWS.on('error', err => {
  logger.error('Binance WS error: ' + err.message);
});

wss.on('connection', ws => {
  clients.push(ws);
  clientSelectedSymbol.set(ws, 'btcusdt'); // default
  logger.info('Frontend client connected. Total clients: ' + clients.length);

  ws.on('message', msg => {
    try {
      const data = JSON.parse(msg);
      if (data.action === 'getPrice' && typeof data.symbol === 'string') {
        clientSelectedSymbol.set(ws, data.symbol.toLowerCase());
      }
    } catch (err) {
      logger.error('Error parsing client message: ' + err.message);
    }
  });

  ws.on('close', () => {
    clients = clients.filter(c => c !== ws);
    clientSelectedSymbol.delete(ws);
    logger.info('Frontend client disconnected. Total clients: ' + clients.length);
  });
});

const PORT = process.env.PORT || 4001;
server.listen(PORT, () => logger.info('Price WebSocket server running on port ' + PORT)); 