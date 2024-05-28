// For Cloudflare workers
const urlToProxy = "https://nyaa.si";

async function handleRequest(request) {
  const url = new URL(request.url);
  const targetUrl = new URL(urlToProxy);
  url.hostname = targetUrl.hostname;
  return fetch(url.toString(), request);
}
addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});
