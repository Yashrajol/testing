import { pool } from '../config/db.js';

/**
 * Configure Graceful Process Shutdown Listener
 */
export function setupGracefulShutdown(server) {
  const handleShutdown = (signal) => {
    console.log(`\n🛑 Received ${signal}. Initiating graceful server shutdown...`);

    // Stop accepting new HTTP requests
    server.close(async () => {
      console.log('🔒 HTTP Server closed to new connections.');

      try {
        // End MySQL pool connections
        await pool.end();
        console.log('💾 MySQL Database pool connections drained and closed.');
        console.log('👋 Backend process shutdown complete. Exiting cleanly.');
        process.exit(0);
      } catch (err) {
        console.error('❌ Error during MySQL pool shutdown:', err);
        process.exit(1);
      }
    });

    // Force termination if graceful teardown takes more than 10 seconds
    setTimeout(() => {
      console.error('⚠️ Forceful shutdown triggered due to timeout.');
      process.exit(1);
    }, 10000);
  };

  process.on('SIGINT', () => handleShutdown('SIGINT'));
  process.on('SIGTERM', () => handleShutdown('SIGTERM'));
}
