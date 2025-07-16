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
    Easily deployable nyaa proxy to access nyaa from blocked regions powered by vercel rewrites
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

## Deploying a Worker

### Manual Deployment (recommended)

To manually deploy the worker:

1. Sign up at the [Cloudflare signup page](https://www.cloudflare.com/sign-up)
2. From the main navbar, choose **Workers & Pages**
3. Click the **Create Application** button
4. Click the **Create Worker** button
5. Copy the [worker.js](https://github.com/uoosef/bepass-worker/blob/main/dist/worker.js) file contents from this repository
6. Fill in a name for your worker and click the **Deploy** button
7. Click the **Quick Edit** button
8. Paste your clipboard contents and replace the worker's default code
9. Click the **Save and Deploy** button

### One-Click Deploy (experienced users only)

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/BioHazard786/Nyaa-Proxy)

## Note

If you want to proxy another url. Change the PROXYURL in `proxy.js`, `api/index.js`, `worker.js`, `vercel.json` and `netlify/functions/proxy.js` file.

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
