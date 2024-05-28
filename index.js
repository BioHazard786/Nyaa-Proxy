// for vercel only
const { createProxyMiddleware } = require("http-proxy-middleware");
const express = require("express");

const app = express();
const urlToProxy = process.env.PROXYURL || "https://nyaa.si";
const port = process.env.PORT || 8000;

// proxy the base path
app.use(
  "/",
  createProxyMiddleware({
    target: urlToProxy,
    changeOrigin: true,
  })
);

// Express server started
app.listen(port, () => {
  console.log(`Proxy server is running at http://localhost:${port}`);
});

// Export the Express API
module.exports = app;
