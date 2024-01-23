// any other SaaS platform
const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
const port = process.env.PORT || 8000;
const urlToProxy = process.env.PROXYURL || "https://nyaa.si";

app.use(
  "*",
  createProxyMiddleware({
    target: urlToProxy,
    changeOrigin: true,
  })
);

app.listen(port, () => {
  console.log(`Proxy server is running at http://localhost:${port}`);
});
