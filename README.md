# Note Taking Web App

A full-stack note-taking application built with Next.js, React, TypeScript, Tailwind CSS, Prisma, and PostgreSQL.

## Overview

The app is structured with the Next.js App Router and split into route groups for authenticated app screens and auth-related pages.

Users can:

- create an account and log in with email and password
- create, edit, archive, restore, and delete notes
- organize notes with comma-separated tags
- browse active notes, archived notes, and notes filtered by tag
- search notes by title, content, or tag
- update their password
- switch between light, dark, and system color themes
- choose between sans-serif, serif, and monospace font themes

## Features

- Session-based authentication with hashed passwords and secure session tokens
- PostgreSQL persistence through Prisma
- User-scoped notes, tags, and sessions
- Responsive dashboard layout for mobile, tablet, and desktop
- Server actions for auth and note mutations
- Toast-based success and error feedback
- Route protection for authenticated dashboard pages
- Theme persistence with `next-themes` and cookies

## Demo Limitations

- Forgot-password and reset-password paths are disabled in the demo build.
- Google authentication is shown as a disabled UI option only.

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Prisma 7
- PostgreSQL
- `bcrypt`
- `zod`
- `next-themes`
- `react-hot-toast`
- `@svgr/webpack`

## Project Structure

```text
app/
  (app)/          authenticated dashboard routes
  (auth)/         authentication routes
  actions/        server actions for auth, flash messages, and notes
  assets/         icons, fonts, and starter data
  components/     reusable auth and dashboard UI
generated/        generated Prisma client
lib/              shared server utilities
prisma/           schema and migrations
utils/            shared formatting, font, and toast helpers
```

## Environment Variables

Create a `.env` file with a PostgreSQL connection string:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
```

## Running Locally

Install dependencies:

```bash
pnpm install
```

Run database migrations:

```bash
pnpm prisma migrate dev
```

Start the development server:

```bash
pnpm dev
```

Create a production build:

```bash
pnpm build
```

Run the production server:

```bash
pnpm start
```
