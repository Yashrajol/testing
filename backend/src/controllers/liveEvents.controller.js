/**
 * Server-Sent Events (SSE) Live Event Stream Channel
 */
export function connectLiveEvents(req, res) {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  // Send initial connection handshake event
  res.write(`data: ${JSON.stringify({ type: 'HANDSHAKE', status: 'CONNECTED', timestamp: new Date().toISOString() })}\n\n`);

  // Heartbeat ping every 15 seconds to maintain channel
  const intervalId = setInterval(() => {
    res.write(`data: ${JSON.stringify({ type: 'HEARTBEAT', timestamp: new Date().toISOString() })}\n\n`);
  }, 15000);

  req.on('close', () => {
    clearInterval(intervalId);
    res.end();
  });
}
