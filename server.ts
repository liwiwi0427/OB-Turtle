import express from 'express';
import http from 'http';
import path from 'path';
import { WebSocketServer, WebSocket } from 'ws';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = 3000;

app.use(express.json());

// Server-authoritative state for Crisis Injection
interface CrisisSyncState {
  activeCrisis: any | null;
  caseId: string | null;
  updatedAt: number;
  sourceDevice?: string;
}

let currentCrisisState: CrisisSyncState = {
  activeCrisis: null,
  caseId: null,
  updatedAt: Date.now()
};

// Create HTTP server to bind both Express and WebSockets on port 3000
const server = http.createServer(app);

// WebSocket Server attached to the HTTP server
const wss = new WebSocketServer({ noServer: true });

function broadcast(data: any) {
  const payload = JSON.stringify(data);
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      try {
        client.send(payload);
      } catch (e) {
        console.error('WebSocket send error:', e);
      }
    }
  });
}

// Upgrade handler routing /ws/crisis
server.on('upgrade', (request, socket, head) => {
  const url = request.url || '';
  if (url.startsWith('/ws/crisis')) {
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit('connection', ws, request);
    });
  }
});

wss.on('connection', (ws) => {
  // Immediately sync current crisis state on connection
  try {
    ws.send(JSON.stringify({
      type: 'CRISIS_SYNC',
      payload: currentCrisisState
    }));
  } catch (e) {
    console.error('Initial state send error:', e);
  }

  ws.on('message', (raw) => {
    try {
      const message = JSON.parse(raw.toString());
      if (message.type === 'INJECT_CRISIS') {
        currentCrisisState = {
          activeCrisis: message.payload.activeCrisis,
          caseId: message.payload.caseId || null,
          updatedAt: Date.now(),
          sourceDevice: message.payload.sourceDevice || 'ws-client'
        };
        broadcast({
          type: 'CRISIS_SYNC',
          payload: currentCrisisState
        });
      } else if (message.type === 'CLEAR_CRISIS') {
        currentCrisisState = {
          activeCrisis: null,
          caseId: null,
          updatedAt: Date.now(),
          sourceDevice: message.payload?.sourceDevice || 'ws-client'
        };
        broadcast({
          type: 'CRISIS_SYNC',
          payload: currentCrisisState
        });
      }
    } catch (err) {
      console.error('Failed to parse WebSocket message:', err);
    }
  });

  ws.on('error', (err) => {
    console.warn('WebSocket client error:', err.message);
  });
});

// Periodic ping to keep connections alive
const pingInterval = setInterval(() => {
  wss.clients.forEach((ws: any) => {
    if (ws.isAlive === false) return ws.terminate();
    ws.isAlive = false;
    ws.ping();
  });
}, 30000);

wss.on('close', () => {
  clearInterval(pingInterval);
});

// ================= API ENDPOINTS =================
// 1. Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: Date.now() });
});

// 2. Get current crisis state
app.get('/api/crisis', (req, res) => {
  res.json({
    success: true,
    ...currentCrisisState,
    connectedClients: wss.clients.size
  });
});

// 3. Inject a crisis
app.post('/api/crisis', (req, res) => {
  const { activeCrisis, caseId, sourceDevice } = req.body;
  currentCrisisState = {
    activeCrisis: activeCrisis || null,
    caseId: caseId || null,
    updatedAt: Date.now(),
    sourceDevice: sourceDevice || 'http-api'
  };

  broadcast({
    type: 'CRISIS_SYNC',
    payload: currentCrisisState
  });

  res.json({
    success: true,
    state: currentCrisisState
  });
});

// 4. Clear the active crisis
app.delete('/api/crisis', (req, res) => {
  currentCrisisState = {
    activeCrisis: null,
    caseId: null,
    updatedAt: Date.now(),
    sourceDevice: (req.query.sourceDevice as string) || 'http-api'
  };

  broadcast({
    type: 'CRISIS_SYNC',
    payload: currentCrisisState
  });

  res.json({
    success: true,
    state: currentCrisisState
  });
});

// Vite & Static Asset Handling
async function setupViteOrStatic() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  server.listen(PORT, '0.0.0.0', () => {
    console.log(`OB-GYN MegaCode server running on http://0.0.0.0:${PORT}`);
  });
}

setupViteOrStatic();
