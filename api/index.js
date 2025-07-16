import { Hono } from "hono";
import { handle } from "hono/vercel";

export const runtime = "edge";

const app = new Hono();
const port = process.env.PORT || 8000;
const urlToProxy = process.env.PROXYURL || "https://nyaa.si";

// Function to determine if the URL is an RSS feed
const isRssFeedUrl = (url) => {
  const rssFeedPattern = /page=rss/; // Basic pattern to identify RSS feeds
  return rssFeedPattern.test(url);
};

// Proxy handler
app.all("/", async (c) => {
  const url = new URL(c.req.url);
  const targetUrl = new URL(urlToProxy + url.pathname + url.search);

  // Get the original request headers
  const headers = new Headers();
  c.req.raw.headers.forEach((value, key) => {
    // Skip host header to avoid conflicts
    if (key.toLowerCase() !== "host") {
      headers.set(key, value);
    }
  });

  // Set the correct host header for the target
  headers.set("host", targetUrl.host);

  try {
    // Forward the request to the target server
    const response = await fetch(targetUrl.toString(), {
      method: c.req.method,
      headers: headers,
      body:
        c.req.method !== "GET" && c.req.method !== "HEAD"
          ? c.req.raw.body
          : undefined,
    });

    // Get response headers
    const responseHeaders = new Headers();
    response.headers.forEach((value, key) => {
      // Skip some headers that might cause issues
      if (
        !["content-encoding", "content-length", "transfer-encoding"].includes(
          key.toLowerCase()
        )
      ) {
        responseHeaders.set(key, value);
      }
    });

    // Handle RSS feed URL rewriting (commented out version from original)
    if (isRssFeedUrl(c.req.url)) {
      const responseText = await response.text();
      const proxiedUrl = `${url.protocol}//${c.req.header("host")}`;
      const modifiedResponse = responseText.replaceAll(urlToProxy, proxiedUrl);

      return new Response(modifiedResponse, {
        status: response.status,
        statusText: response.statusText,
        headers: responseHeaders,
      });
    }

    // For non-RSS requests, just pass through the response
    const responseBody = await response.arrayBuffer();

    return new Response(responseBody, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error("Proxy error:", error);
    return c.json({ error: "Proxy request failed" }, 500);
  }
});

// Export the Hono API
export const GET = handle(app);
