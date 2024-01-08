const { createProxyMiddleware } = require("http-proxy-middleware");
const express = require("express");

const app = express();
const port = process.env.PORT || 8000;
const urlToProxy = "https://nyaa.si";

// proxy every path
app.use(
  "*",
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
