// for vercel only
const {
  createProxyMiddleware,
  responseInterceptor,
} = require("http-proxy-middleware");
const express = require("express");

const app = express();
app.enable("trust proxy");
const urlToProxy = process.env.PROXYURL || "https://nyaa.si";
const port = process.env.PORT || 8000;

// Function to determine if the URL is an RSS feed
const isRssFeedUrl = (url) => {
  const rssFeedPattern = /page=rss/; // Basic pattern to identify RSS feeds
  return rssFeedPattern.test(url);
};

// Proxy middleware configuration
const options = {
  target: urlToProxy.toString(),
  changeOrigin: true,
  selfHandleResponse: true,
  onProxyRes: responseInterceptor(
    async (responseBuffer, proxyRes, req, res) => {
      if (isRssFeedUrl(req.url)) {
        const response = responseBuffer.toString("utf8");
        const proxiedUrl = `${req.protocol}://${req.get("host")}`;
        console.log(proxiedUrl);
        return response.replaceAll(urlToProxy, proxiedUrl);
      } else {
        return responseBuffer.toString("utf-8");
      }
    }
  ),
};

app.use("/", createProxyMiddleware(options));

// Express server started
app.listen(port, () => {
  console.log(`Proxy server is running at http://localhost:${port}`);
});

// Export the Express API
module.exports = app;
