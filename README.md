<p align="center">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://github.com/javier-arango/codeflix/assets/58098790/9a05bbbb-de7d-4a09-8ffa-58f970054211">
      <img src="https://github.com/javier-arango/codeflix/assets/58098790/9a05bbbb-de7d-4a09-8ffa-58f970054211" alt="Cinemify" width="500" />
    </picture>
</p>


<h3 align="center">Fuel Your Code. Spark Your Journey.</h3>

<br/>
<p align="center">Codeflix is your one-stop educational platform designed exclusively for computer science students. Whether you're delving into algorithms, exploring backend development, or learning front-end frameworks, Codeflix offers an expansive collection of curated educational videos to guide your journey. With features that allow users to categorize videos, create personalized playlists, and dive deeper into specific topics, we're here to accelerate your learning process and elevate your coding skills.</p>

## Table of Contents
- [Core App Features](#core-app-features)
- [Technology Stack](#technology-stack)
- [App Architecture](#app-architecture)
- [Getting Started](#getting-started)
- [License](#license)

## Core App Features

- `Search Functionality`: Users can search for educational videos by topic, difficulty level, or instructor.
- `Category Browsing`: Navigate through pre-defined categories such as Backend, Frontend, Algorithms, and more.
- `Trending Videos`: Keep tabs on the most popular and highly-rated educational videos in the computer science realm.
- `User Ratings`: Rate videos on a scale of 1 to 5 to help improve content quality and recommendations.
- `Write Reviews`: Share your insights on a particular video or topic by writing a detailed review.
- `Custom Playlists`: Create, edit, and manage personalized playlists of videos for streamlined learning.
- `In-Video Features`: Utilize options like adjustable playback speed, closed captions, and in-video note-taking.
- `Sign-up/Login`: Securely register and log into your account with email verification and two-factor authentication.
- `Profile Customization`: Customize your user profile with a photo, short bio, and your areas of interest in computer science.
- `Supplementary Resources`: Access additional reading material, code samples, and quizzes related to each video topic.

## Technology Stack

This blend of technologies ensures that Cinemify is built on a modern, efficient, and reliable stack, which aids both in development and the final user experience.

#### Web Framework
- `Next.js`: Utilized for both server-side and client-side rendering, Next.js enables a fast and SEO-friendly user experience.
- `React.js`: Primarily used for building user interfaces, React.js allows for efficient and dynamic rendering of UI components.

#### Development Language
- `TypeScript`: Adopted for both front-end and back-end development, TypeScript offers strong type-checking to catch errors during development, leading to robust and maintainable code.
- `SCSS`: SCSS is used for styling the front-end, allowing for variables, nesting, and other features that make the CSS both more maintainable and extendable.

#### Database
- `Prisma`: Used as the ORM for interacting with the database, Prisma simplifies database workflows with a strongly-typed API.
- `SQLite`: A lightweight, file-based database ideal for development and smaller-scale applications.

#### API Communication
- `RESTful API`: The back-end communicates with the front-end using REST API endpoints, facilitating seamless data exchange.

#### Authentication
- `NextAuth.js`: This library is used for implementing secure authentication workflows with various OAuth providers and other custom strategies.

## App Architecture
```mermaid
graph TD
    A[Users] --> B[Front-End]
    B --> C[Backend]
    C -->|Data| D[Prisma ORM]
    D --> E[SQLite Database]
    C -->|Authentication| G[NextAuth.js]
    C --> B
```


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## License
[MIT](https://github.com/javier-arango/cinemify/blob/main/LICENSE)
