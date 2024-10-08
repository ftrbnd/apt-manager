<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->

<a name="readme-top"></a>

<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/ftrbnd/apt-manager">
    <img src="src/assets/notebook.svg" height="80" width="80">
  </a>

<h3 align="center">Apt Manager</h3>

  <p align="center">
    A web app for managing apartment buildings, their units and rent
    <br />
    <a href="https://github.com/ftrbnd/apt-manager-server/issues">Report Bug</a>
    ·
    <a href="https://github.com/ftrbnd/apt-manager-server/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#configuration">Configuration</a></li>
      </ul>
    </li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

This management app was created to help with my own apartment building to make managing rent and printing our monthly receipts easier.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- [![Typescript][Typescript]][Typescript-url]
- [![Next.js][Next.js]][Next-url]
- [![Lucia][Lucia]][Lucia-url]
- [![Shadcn][Shadcn]][Shadcn-url]
- [![Tailwind][Tailwind]][Tailwind-url]
- [![Drizzle][Drizzle]][Drizzle-url]
- [![VercelPg][VercelPg]][VercelPg-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

- [Apple](https://developer.apple.com/) client id, team id, key id, and certificate
- Database urls and key from [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)
- Ngrok auth token to test Sign in with Apple in development

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/ftrbnd/apt-manager.git
   ```
2. Install NPM packages
   ```sh
   yarn install
   ```
3. Start the local dev server with Makefile

   ```sh
   make dev
   ```

   OR run the following in separate shells

   ```
    yarn dev
    yarn ngrok
    yarn db:studio (optional)
   ```

### Configuration

Create a `.env` file at the root and fill out the values:

```env
  NEXT_PUBLIC_AUTH_REDIRECT_URI="https://{{ NGROK_URL }}/login/apple/callback"
  AUTH_REDIRECT_URI="https://{{ NGROK_URL }}/login/apple/callback"

  APPLE_CERTIFICATE=
  APPLE_KEY_ID=
  APPLE_TEAM_ID=
  APPLE_CLIENT_ID=

  POSTGRES_DATABASE="verceldb"
  POSTGRES_HOST=
  POSTGRES_PASSWORD=
  POSTGRES_PRISMA_URL=
  POSTGRES_URL=
  POSTGRES_URL_NON_POOLING=
  POSTGRES_URL_NO_SSL=
  POSTGRES_USER=

  NGROK_AUTHTOKEN=
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Giovanni Salas - [@finalcalI](https://twitter.com/finalcali) - giosalas25@gmail.com

Project Link: [https://github.com/ftrbnd/apt-manager](https://github.com/ftrbnd/apt-manager)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[Typescript]: https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white
[Typescript-url]: https://www.typescriptlang.org/
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[Lucia]: https://img.shields.io/badge/lucia-5F57FF?style=for-the-badge&logo=lucia&logoColor=fff
[Lucia-url]: https://lucia.com/
[Shadcn]: https://img.shields.io/badge/-shadcn/ui-000000?style=for-the-badge&logo=shadcnui&logoColor=fff
[Shadcn-url]: https://ui.shadcn.com/
[Tailwind]: https://img.shields.io/badge/tailwind-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white
[Tailwind-url]: https://tailwindcss.com/
[Drizzle]: https://img.shields.io/badge/drizzle-000000?style=for-the-badge&logo=drizzle&logoColor=C5F74F
[Drizzle-url]: https://orm.drizzle.team/
[VercelPg]: https://img.shields.io/badge/vercel-000?style=for-the-badge&logo=vercel&logoColor=fff
[VercelPg-url]: https://vercel.com/docs/storage/vercel-postgres
