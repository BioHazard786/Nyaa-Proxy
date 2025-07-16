// For Cloudflare Workers

const urlToProxy = new URL("https://nyaa.si");

async function handleRequest(request) {
  const url = new URL(request.url);
  const path = url.pathname;
  const queryParams = url.search;

  // Build the target URL
  const targetUrl = `${urlToProxy}${path || "/"}${queryParams || ""}`;

  try {
    // Create headers object from original request
    const headersObj = {};
    for (const [key, value] of request.headers.entries()) {
      // Skip CF headers, host, and sec-fetch-site headers
      if (
        key.toLowerCase() !== "host" &&
        key.toLowerCase() !== "sec-fetch-site" &&
        !key.toLowerCase().startsWith("cf-") &&
        key.toLowerCase() !== "x-forwarded-proto" &&
        key.toLowerCase() !== "x-real-ip" &&
        key.toLowerCase() !== "referer" &&
        key.toLowerCase() !== "cookie"
      ) {
        headersObj[key] = value;
      }
    }

    // Add custom headers to appear more like a regular browser
    const modifiedRequest = new Request(targetUrl, {
      method: request.method,
      headers: {
        ...headersObj,
        Host: urlToProxy.host,
        "Sec-Fetch-Site": "same-origin",
        "Access-Control-Allow-Origin": "*",
        Referer: urlToProxy.href,
      },
      body:
        request.method !== "GET" && request.method !== "HEAD"
          ? request.body
          : null,
    });

    console.log(
      "Modified Request Headers:",
      JSON.stringify(
        Object.fromEntries(modifiedRequest.headers.entries()),
        null,
        2
      )
    );

    const response = await fetch(modifiedRequest);

    // Return response as-is with proxy headers
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });
  } catch (error) {
    console.error("Proxy error:", error);

    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export default {
  async fetch(request, env, ctx) {
    return handleRequest(request);
  },
};
