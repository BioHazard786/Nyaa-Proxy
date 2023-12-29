let proxy = require("express-http-proxy");
let app = require("express")();

const proxyUrl = "https://nyaa.si";

app.use("/", proxy(proxyUrl));

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Proxy server is running at http://localhost:${port}`);
});

// Export the Express API
module.exports = app;
