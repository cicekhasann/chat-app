const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/ws', // WebSocket isteği için kullanılacak yol
    createProxyMiddleware({
      target: 'http://localhost:8080', // WebSocket sunucunuzun adresi
      changeOrigin: true,
      ws: true, // WebSocket desteğini etkinleştirir
    })
  );
};
