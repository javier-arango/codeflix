<p align="center">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://github.com/javier-arango/codeflix/assets/58098790/49336bd9-9a4e-4e64-bd2e-ee463388b8e0">
      <img src="https://github.com/javier-arango/codeflix/assets/58098790/49336bd9-9a4e-4e64-bd2e-ee463388b8e0" alt="Codeflix" width="500" />
    </picture>
</p>

<h3 align="center">Fuel Your Code. Spark Your Journey.</h3>

<br/>

<p align="center">
    <img src="https://github.com/javier-arango/codeflix/actions/workflows/lint_test_build.yml/badge.svg" />
    <img src="https://github.com/javier-arango/codeflix/actions/workflows/pr_validation.yml/badge.svg" />
    <img src="https://therealsujitk-vercel-badge.vercel.app/?app=codeflix" />
    <img src="https://sonarcloud.io/api/project_badges/measure?project=javier-arango_codeflix&metric=alert_status" />
</p>


<p align="center">Codeflix is your one-stop educational platform designed exclusively for computer science students. Whether you're delving into algorithms, exploring backend development, or learning front-end frameworks, Codeflix offers an expansive collection of curated educational videos to guide your journey. With features that allow users to categorize videos, create personalized playlists, and dive deeper into specific topics, we're here to accelerate your learning process and elevate your coding skills.</p>

## Table of Contents
- [Installation](#installation)
- [Configuration](#configuration)
    - [Setting Up Credentials](#setting-up-credentials)
        - [Cloudinary](#cloudinary)
        - [Supabase](#supabase)
        - [Google API Key](#google-api-key)
        - [NextAuth.js Secret](#nextauthjs-secret)
- [Getting Started](#getting-started)
    - [Development Server](#development-server)
    - [Database Setup with Prisma](#database-setup-with-prisma)
      - [Migration](#migration)
      - [Manual Seeding](#manual-seeding)
      - [Visualize the Database](#visualize-the-database)
- [Contribution](#contribution)
- [Helpful Resources](#helpful-resources)
- [License](#license)

## Installation
Clone and set up Codeflix with these steps:

```bash
git clone https://github.com/javier-arango/codeflix.git

cd codeflix

npm install
```

## Configuration
Rename `.env.example` to `.env.local` and update environment variables:

```bash
# Cloudinary credentials
# https://cloudinary.com/documentation/cloudinary_credentials_tutorial#:~:text=Log%20into%20your%20Cloudinary%20Console,Secret%20and%20API%20Environment%20Variable.
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME={YOUR_CLOUD_NAME}
NEXT_PUBLIC_CLOUDINARY_API_KEY={YOUR_API_KEY}
NEXT_PUBLIC_CLOUDINARY_SECRET_KEY={YOUR_SECRET_KEY}

# Supabase credentials
DIRECT_URL={YOUR_DIRECT_URL}
DATABASE_URL={YOUR_DATABASE_URL}

# NextAuth.js credentials
# https://next-auth.js.org/configuration/options#nextauth_secret
NEXTAUTH_SECRET={YOUR_SECRET}

# Google API Key if you want to generate videos from YouTube api
GOOGLE_API_KEY={YOUR_API_KEY}
```

### Setting Up Credentials

This project requires several API keys and credentials for different services. Here's how you can obtain them:

#### Cloudinary

Cloudinary is used for image management. To get your Cloudinary credentials:

1. [Sign up](https://cloudinary.com) for a free Cloudinary account if you don't have one.
2. Log into your Cloudinary Console.
3. Go to the [Dashboard](https://cloudinary.com/console) page.
4. Here, you'll find your Cloud name, API Key, API Secret, and API Environment Variable.

For more details, refer to the [Cloudinary Credentials Tutorial](https://cloudinary.com/documentation/cloudinary_credentials_tutorial).

#### Supabase

Supabase is used as the backend service for the Database. To get your Supabase API keys:

1. [Sign up](https://app.supabase.io/signup) for a free Supabase account if you don't have one.
2. Create a new project.
3. Go to the API section in the settings of your project.
4. Here, you'll find the URL and public and secret API keys.

For more details, refer to the [Supabase API Documentation](https://supabase.com/partners/integrations/prisma).

#### Google API Key

The Google API key is used to fetch data from YouTube. To get your Google API key:

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project.
3. Enable the YouTube Data API v3 for your project.
4. Create credentials for the YouTube Data API v3.
5. Select API key in the credentials type.

For more details, refer to the [Getting Started with YouTube Data API v3](https://developers.google.com/youtube/v3/getting-started#before-you-start).

#### NextAuth.js Secret

NextAuth.js requires a secret for encryption. To generate a secret:

1. Open a terminal.
2. Run the following command:

```bash
openssl rand -base64 32
```

For more details, refer to the [NextAuth.js Configuration Documentation](https://next-auth.js.org/configuration/options#nextauth_secret).


## Getting Started

### Development Server
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

### Database Setup with Prisma

This project is configured with Prisma, an advanced Object-Relational Mapping (ORM) to facilitate seamless database operations. Follow the steps below for both development and testing environments.

#### Migration

Run the migration command to establish the database schema. Prisma Migrate uses your migration files to manage the schema changes:

```bash
npm run prisma:migrate
# or
yarn prisma:migrate
```

> **Note:** Prisma Migrate integrates with seeds. When it resets the development database, it automatically triggers the seeding.

#### Manual Seeding

Execute the seeding command to populate your database with predefined data essential for testing. Modify the `prisma/seed.ts` file if you wish to make changes to the default seeding data:

```bash
npm run prisma:seed
# or
yarn prisma:seed
```

#### Visualize the Database

Prisma Studio provides a graphical interface, enabling you to visualize and manage your database records effortlessly. You can run the following command to start Prisma Studio:

```bash
npm run prisma:studio
# or
yarn prisma:studio
```

Visit [http://localhost:5555](http://localhost:5555/) to access Prisma Studio and manage your database interactively.

## Contribution

Contributions to Codeflix are welcomed! Please refer to the [CONTRIBUTING.md](https://github.com/javier-arango/codeflix/blob/main/CONTRIBUTING.md) file for guidelines on how to make meaningful additions to our platform.

## Helpful Resources

### Supabase
- [Supabase Prisma Integration](https://supabase.com/partners/integrations/prisma)

### Prisma
- [Using Prisma with Supabase](https://www.prisma.io/docs/guides/database/supabase)
- [Prisma CRUD](https://www.prisma.io/docs/concepts/components/prisma-client/crud)
- [Connection management](https://www.prisma.io/docs/guides/performance-and-optimization/connection-management#serverless-environments-faas)
- [DB Relations](https://www.prisma.io/docs/concepts/components/prisma-schema/relations)
- [Implicit Many to Many Relation](https://www.prisma.io/docs/concepts/components/prisma-schema/relations/many-to-many-relations#implicit-many-to-many-relations)

#### Next.js
- [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Pages and Layouts](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts)
- [Data Fetching, Caching, and Revalidating](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating)
- [Fetching Data on the Client with third-party libraries](https://swr.vercel.app/docs/getting-started)

## License
This project is released under the [MIT License](https://github.com/javier-arango/codeflix/blob/main/LICENSE)
