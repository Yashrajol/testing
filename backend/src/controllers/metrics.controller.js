/**
 * Prometheus Telemetry Exposition Endpoint
 */
export function getPrometheusMetrics(req, res) {
  const memoryUsage = process.memoryUsage();
  const uptime = process.uptime();

  const metricsText = `
# HELP node_process_uptime_seconds Total process uptime in seconds.
# TYPE node_process_uptime_seconds gauge
node_process_uptime_seconds ${uptime.toFixed(2)}

# HELP node_memory_heap_bytes Memory heap statistics in bytes.
# TYPE node_memory_heap_bytes gauge
node_memory_heap_bytes{type="total"} ${memoryUsage.heapTotal}
node_memory_heap_bytes{type="used"} ${memoryUsage.heapUsed}
node_memory_heap_bytes{type="rss"} ${memoryUsage.rss}

# HELP node_mysql_pool_connections Active MySQL connection pool limit.
# TYPE node_mysql_pool_connections gauge
node_mysql_pool_connections{state="limit"} 10

# HELP vedhkrit_backend_status Operational backend status indicator.
# TYPE vedhkrit_backend_status gauge
vedhkrit_backend_status 1
  `.trim();

  res.setHeader('Content-Type', 'text/plain; version=0.0.4');
  return res.status(200).send(metricsText);
}
