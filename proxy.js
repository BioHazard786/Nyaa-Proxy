// any other SaaS platform
const express = require("express");
const {
  createProxyMiddleware,
  responseInterceptor,
} = require("http-proxy-middleware");

const app = express();
app.enable("trust proxy");
const port = process.env.PORT || 8000;
const urlToProxy = process.env.PROXYURL || "https://nyaa.si";

// Function to determine if the URL is an RSS feed
const isRssFeedUrl = (url) => {
  const rssFeedPattern = /page=rss/; // Basic pattern to identify RSS feeds
  return rssFeedPattern.test(url);
};

// Proxy middleware configuration
// If you wnat to enable proxy on rss on nyaa
// const options = {
//   target: urlToProxy,
//   changeOrigin: true,
//   selfHandleResponse: true,
//   onProxyRes: responseInterceptor(
//     async (responseBuffer, proxyRes, req, res) => {
//       if (isRssFeedUrl(req.url)) {
//         const response = responseBuffer.toString("utf8");
//         const proxiedUrl = `${req.protocol}://${req.get("host")}`;
//         return response.replaceAll(urlToProxy, proxiedUrl);
//       } else {
//         return responseBuffer.toString("utf-8");
//       }
//     }
//   ),
// };

// Normal Proxy
const options = {
  target: urlToProxy,
  changeOrigin: true,
};

app.use("*", createProxyMiddleware(options));

// Express server started
app.listen(port, () => {
  console.log(`Proxy server is running at http://localhost:${port}`);
});
