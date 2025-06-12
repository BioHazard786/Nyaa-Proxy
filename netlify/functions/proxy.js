const fetch = require("node-fetch");

exports.handler = async (event, context) => {
  const { path, queryStringParameters } = event;

  // Build the target URL
  const urlToProxy = process.env.PROXYURL || "https://nyaa.si";
  let targetUrl = `${urlToProxy}${path || "/"}`;
  if (queryStringParameters) {
    const params = new URLSearchParams(queryStringParameters).toString();
    targetUrl += `?${params}`;
  }

  try {
    // Add custom headers to appear more like a regular browser
    const response = await fetch(targetUrl, {
      method: event.httpMethod,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
        "Accept-Encoding": "gzip, deflate, br",
        Connection: "keep-alive",
        "Upgrade-Insecure-Requests": "1",
        // Forward some original headers
        ...(event.headers.referer && { Referer: event.headers.referer }),
      },
    });

    const body = await response.text();

    // Handle RSS feeds - replace URLs
    let processedBody = body;
    if (path && path.includes("page=rss")) {
      const proxyUrl = `https://${event.headers.host}`;
      processedBody = body.replace(/https:\/\/nyaa\.si/g, proxyUrl);
    }

    return {
      statusCode: response.status,
      headers: {
        "Content-Type": response.headers.get("content-type") || "text/html",
        "Cache-Control": "public, max-age=300", // Cache for 5 minutes
        "Access-Control-Allow-Origin": "*",
        // Remove some headers that might cause issues
        "X-Frame-Options": "SAMEORIGIN",
      },
      body: processedBody,
    };
  } catch (error) {
    console.error("Proxy error:", error);

    // Return a more user-friendly error for rate limiting
    if (error.message.includes("429") || error.code === "ECONNRESET") {
      return {
        statusCode: 503,
        headers: { "Content-Type": "text/html" },
        body: `
          <html>
            <head><title>Service Temporarily Unavailable</title></head>
            <body>
              <h1>Service Temporarily Unavailable</h1>
              <p>The service is experiencing high traffic. Please try again in a few moments.</p>
              <script>
                setTimeout(() => {
                  window.location.reload();
                }, 5000);
              </script>
            </body>
          </html>
        `,
      };
    }

    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Internal server error" }),
    };
  }
};
