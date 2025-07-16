import { Hono } from "jsr:@hono/hono";
import { handle } from "jsr:@hono/hono/netlify";

// Function to rewrite URLs in HTML content
function rewriteUrls(html, originalDomain, proxyDomain) {
  // Replace absolute URLs pointing to the original domain
  html = html.replace(
    new RegExp(originalDomain.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g"),
    proxyDomain
  );

  // Fix meta tags with URLs (like favicon, icons, etc.)
  html = html.replace(
    /(<meta[^>]*content=['"])\/([^'"]*?)(['"][^>]*>)/g,
    "$1/$2$3"
  );
  html = html.replace(
    /(<link[^>]*href=['"])\/([^'"]*?)(['"][^>]*>)/g,
    "$1/$2$3"
  );

  // Fix CSS @import statements
  html = html.replace(
    /@import\s+url\(['"]?\/([^'"]*?)['"]?\)/g,
    `@import url('/$1')`
  );
  html = html.replace(/@import\s+['"]\/([^'"]*?)['"];/g, `@import '/$1';`);

  // Fix CSS background images and other url() references in style attributes and CSS
  html = html.replace(/url\(['"]?\/([^'"]*?)['"]?\)/g, `url('/$1')`);

  // Fix form actions
  html = html.replace(/(action=['"])\/([^'"]*?)(['"])/g, "$1/$2$3");

  // Fix JavaScript URLs in onclick, etc.
  html = html.replace(
    /((?:window\.)?location\.href\s*=\s*['"])\/([^'"]*?)(['"])/g,
    "$1/$2$3"
  );
  html = html.replace(/((?:window\.)?open\(['"])\/([^'"]*?)(['"])/g, "$1/$2$3");

  return html;
}

// Function to rewrite URLs in CSS content
function rewriteCssUrls(css, originalDomain, proxyDomain) {
  // Replace absolute URLs pointing to the original domain
  css = css.replace(
    new RegExp(originalDomain.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g"),
    proxyDomain
  );

  // Fix CSS @import statements
  css = css.replace(
    /@import\s+url\(['"]?\/([^'"]*?)['"]?\)/g,
    `@import url('/$1')`
  );
  css = css.replace(/@import\s+['"]\/([^'"]*?)['"];/g, `@import '/$1';`);

  // Fix CSS background images and other url() references
  css = css.replace(/url\(['"]?\/([^'"]*?)['"]?\)/g, `url('/$1')`);

  return css;
}

// Create Hono app
const app = new Hono();

// Handle all routes
app.all("*", async (c) => {
  const url = new URL(c.req.url);
  const path = url.pathname;
  const queryParams = url.search;

  // Build the target URL
  const urlToProxy = Netlify.env.get("PROXYURL") || "https://nyaa.si";
  const targetUrl = `${urlToProxy}${path || "/"}${queryParams || ""}`;

  // Get the current proxy URL (where this function is deployed)
  const proxyUrl = `https://${c.req.header("host")}`;

  try {
    // Add custom headers to appear more like a regular browser
    const response = await fetch(targetUrl, {
      method: c.req.method,
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
        ...(c.req.header("referer") && {
          Referer: c.req.header("referer"),
        }),
      },
      body:
        c.req.method !== "GET" && c.req.method !== "HEAD"
          ? c.req.body
          : undefined,
    });

    const contentType = response.headers.get("content-type") || "";

    // Handle different content types
    if (contentType.includes("text/html")) {
      // For HTML content, rewrite URLs to go through proxy
      let body = await response.text();

      // Rewrite URLs in HTML to go through the proxy
      body = rewriteUrls(body, urlToProxy, proxyUrl);

      return c.html(body, {
        status: response.status,
        headers: {
          "Content-Type": contentType,
          "Cache-Control": "public, max-age=300",
          "Access-Control-Allow-Origin": "*",
          "X-Frame-Options": "SAMEORIGIN",
        },
      });
    } else if (contentType.includes("text/css")) {
      // For CSS content, also rewrite URLs
      let body = await response.text();

      // Rewrite URLs in CSS
      body = rewriteCssUrls(body, urlToProxy, proxyUrl);

      return c.text(body, {
        status: response.status,
        headers: {
          "Content-Type": contentType,
          "Cache-Control": "public, max-age=3600",
          "Access-Control-Allow-Origin": "*",
        },
      });
    } else {
      // For non-HTML/CSS content (images, JS, etc.), return as-is
      const arrayBuffer = await response.arrayBuffer();

      return c.body(arrayBuffer, {
        status: response.status,
        headers: {
          "Content-Type": contentType,
          "Cache-Control": "public, max-age=3600", // Cache assets longer
          "Access-Control-Allow-Origin": "*",
        },
      });
    }
  } catch (error) {
    console.error("Proxy error:", error);

    // Return a more user-friendly error for rate limiting
    if (
      error.message &&
      (error.message.includes("429") || error.message.includes("ECONNRESET"))
    ) {
      return c.html(
        `
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
        503
      );
    }

    return c.json({ error: "Internal server error" }, 500);
  }
});

// Export the Netlify handler
export default handle(app);
