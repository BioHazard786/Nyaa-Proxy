# Nyaa Proxy

> **⚠️ IMPORTANT NOTICE**
>
> All publicly hosted proxies have been nuked/blocked. It's highly recommended to host your own instance for reliable access. **Vercel** and **Netlify** are the preferred platforms for easy deployment.

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/BioHazard786/Nyaa-Proxy">
    <img src="nyaa.png" alt="Logo" width="100" height="100" style="border-radius:15px">
  </a>

  <h3 align="center">Nyaa Proxy</h3>

  <p align="center">
    Easily deployable nyaa proxy to access nyaa from blocked regions
    <br />
    <br />
    <a href="https://github.com/BioHazard786/Nyaa-Proxy/issues">Report Bug</a>
    ·
    <a href="https://github.com/BioHazard786/Nyaa-Proxy/issues">Request Feature</a>
  </p>
</div>

## Deploy to Vercel

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/BioHazard786/Nyaa-Proxy)

## Deploy to Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/BioHazard786/Nyaa-Proxy)

## Deploy to Koyeb

[![Deploy to Koyeb](https://www.koyeb.com/static/images/deploy/button.svg)](https://app.koyeb.com/deploy?type=git&repository=github.com/BioHazard786/Nyaa-Proxy&branch=master&name=Nyaa-Proxy&builder=dockerfile&ports=8000;http;/)

## Environment Variables

Copy `sample.env` to `.env` (local) or import into your platform.

| Variable | Default | Description |
|----------|---------|-------------|
| `PROXY_URL` | <https://nyaa.si> | Base upstream site to proxy |
| `PORT` | 8000 | Local server port (Docker/Node) |
| `PROXY_RSS_PAGE` | true | If `true`, rewrite RSS feed URLs to your deployed domain |

### Using sample.env locally

```bash
cp sample.env .env
# Edit .env if you want a different upstream
```

## Vercel Deployment & Env Vars

Install CLI:

```bash
npm i -g vercel
```

Add env vars interactively:

```bash
vercel env add PROXY_URL production
vercel env add PROXY_RSS_PAGE production
```

Pull all remote envs into a local file:

```bash
vercel env pull .env.local
```

Set for preview / development similarly (`vercel env add PROXY_URL preview`).

## Netlify Deployment & Env Vars

Install CLI:

```bash
npm i -g netlify-cli
```

Set individual variables:

```bash
netlify env:set PROXY_URL https://nyaa.si
netlify env:set PROXY_RSS_PAGE true
```

Import all from file:

```bash
netlify env:import .env
```

List:

```bash
netlify env:list
```

## Docker Usage (commands only)

Using the included docker-compose.yml (expects .env in the same directory):

```bash
# start (detached)
docker compose up -d

# start and build
docker compose up -d --build

# stop and remove containers
docker compose down

# stream service logs
docker compose logs -f nyaa-proxy
```

Run the official image without compose:

```bash
docker run --env-file .env -p 8000:8000 ghcr.io/biohazard786/nyaa-proxy:latest
```

Build and run locally:

```bash
docker build -t nyaa-proxy .
docker run --env-file .env -p 8000:8000 nyaa-proxy
```

Override specific env vars on the CLI:

```bash
docker run -e PROXY_URL=https://example.com -e PORT=8000 -e PROXY_RSS_PAGE=true -p 8000:8000 nyaa-proxy
```

## Cloudflare Workers Note

Cloudflare IP ranges appear banned by `nyaa.si`; prefer Vercel/Netlify or a VPS. Workers script kept for reference but may not function reliably against the upstream.

## Customizing Upstream

Change only the environment variable; no code edits required. For Netlify Functions and Vercel Edge, deploy after updating env vars.

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Mohd Zaid - [Telegram](https://t.me/LuLu786) - <bzatch70@gmail.com>

Project Link : [https://github.com/BioHazard786/Nyaa-Proxy](https://github.com/BioHazard786/Nyaa-Proxy)

[contributors-shield]: https://img.shields.io/github/contributors/BioHazard786/Nyaa-Proxy.svg
[contributors-url]: https://github.com/BioHazard786/Nyaa-Proxy/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/BioHazard786/Nyaa-Proxy.svg
[forks-url]: https://github.com/BioHazard786/Nyaa-Proxy/network/members
[stars-shield]: https://img.shields.io/github/stars/BioHazard786/Nyaa-Proxy.svg
[stars-url]: https://github.com/BioHazard786/Nyaa-Proxy/stargazers
[issues-shield]: https://img.shields.io/github/issues/BioHazard786/Nyaa-Proxy.svg
[issues-url]: https://github.com/BioHazard786/Nyaa-Proxy/issues
[license-shield]: https://img.shields.io/github/license/BioHazard786/Nyaa-Proxy.svg
[license-url]: https://github.com/BioHazard786/Nyaa-Proxy/blob/master/LICENSE
