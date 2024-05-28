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
    <a href="https://nyaa-proxy.vercel.app/">View Demo</a>
    ·
    <a href="https://github.com/BioHazard786/Nyaa-Proxy/issues">Report Bug</a>
    ·
    <a href="https://github.com/BioHazard786/Nyaa-Proxy/issues">Request Feature</a>
  </p>
</div>

## Deploy to Vercel

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/BioHazard786/Nyaa-Proxy)

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
10. Write down the newly created worker address, it should be something like **[name].[username].workers.dev**
11. Change your Bepass configuration to **https://[name].[username].workers.dev/dns-query**

### One-Click Deploy (experienced users only)

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/BioHazard786/Nyaa-Proxy)

## Note

If you want to proxy another url. Change the PROXYURL in `proxy.js`, `index.js`, `worker.js` and `vercel.json`

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Mohd Zaid - [@LuLu786](https://t.me/LuLu786) - bzatch70@gmail.com

Project Link : [https://github.com/BioHazard786/Nyaa-Proxy](https://github.com/BioHazard786/Nyaa-Proxy)

[contributors-shield]: https://img.shields.io/github/contributors/BioHazard786/Nyaa-Proxy.svg?style=for-the-badge
[contributors-url]: https://github.com/BioHazard786/Nyaa-Proxy/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/BioHazard786/Nyaa-Proxy.svg?style=for-the-badge
[forks-url]: https://github.com/BioHazard786/Nyaa-Proxy/network/members
[stars-shield]: https://img.shields.io/github/stars/BioHazard786/Nyaa-Proxy.svg?style=for-the-badge
[stars-url]: https://github.com/BioHazard786/Nyaa-Proxy/stargazers
[issues-shield]: https://img.shields.io/github/issues/BioHazard786/Nyaa-Proxy.svg?style=for-the-badge
[issues-url]: https://github.com/BioHazard786/Nyaa-Proxy/issues
[license-shield]: https://img.shields.io/github/license/BioHazard786/Nyaa-Proxy.svg?style=for-the-badge
[license-url]: https://github.com/BioHazard786/Nyaa-Proxy/blob/master/LICENSE
