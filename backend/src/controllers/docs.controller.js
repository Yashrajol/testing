import { openApiSpec } from '../config/swagger.js';

/**
 * Return Raw OpenAPI 3.0 JSON Specification
 */
export function getApiDocsJson(req, res) {
  return res.status(200).json(openApiSpec);
}

/**
 * Render Branded Interactive API Documentation Portal
 */
export function getApiDocsHtml(req, res) {
  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>VEDHKRIT API Documentation</title>
  <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5/swagger-ui.css" />
  <style>
    body { margin: 0; padding: 0; background: #0b0f19; font-family: system-ui, sans-serif; }
    .header { background: #111827; padding: 16px 24px; border-bottom: 1px solid #1f2937; display: flex; align-items: center; justify-content: space-between; }
    .header h1 { color: #3b82f6; font-size: 20px; margin: 0; }
    .header span { color: #9ca3af; font-size: 14px; }
    #swagger-ui { max-width: 1200px; margin: 0 auto; padding: 20px; }
    .swagger-ui .topbar { display: none; }
  </style>
</head>
<body>
  <div class="header">
    <h1>🚀 VEDHKRIT Learner OS API Portal</h1>
    <span>OpenAPI 3.0 Specification</span>
  </div>
  <div id="swagger-ui"></div>
  <script src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js"></script>
  <script>
    window.onload = () => {
      window.ui = SwaggerUIBundle({
        url: '/api/v1/docs/json',
        dom_id: '#swagger-ui',
        deepLinking: true,
        presets: [
          SwaggerUIBundle.presets.apis,
          SwaggerUIBundle.SwaggerUIStandalonePreset
        ],
      });
    };
  </script>
</body>
</html>
  `;

  res.setHeader('Content-Type', 'text/html');
  return res.status(200).send(htmlContent);
}
