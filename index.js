let app = require("express")();

const port = process.env.PORT || 8000;

// Express server started
app.listen(port, () => {
  console.log(`Proxy server is running at http://localhost:${port}`);
});

// Export the Express API
module.exports = app;
