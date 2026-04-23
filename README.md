# Note Taking Web App

A note-taking application built with Next.js, React, TypeScript, and Tailwind CSS.

This project is still in active development. The current build already includes the main dashboard flows, note browsing views, authentication screens, and user settings pages, while some behavior and data persistence are still being refined.

## Overview

The goal of this project is to build a polished note-taking experience with:

- authentication flows
- note browsing and note details
- archived notes
- tag-based navigation
- search views
- user settings for password, color theme, and font theme

The app is structured with the Next.js App Router and split into route groups for authenticated app screens and auth-related pages.

## Current Status

This is a work in progress portfolio project.

### Implemented

- auth route group with login, signup, forgot password, and reset password pages
- dashboard route group with note detail pages
- archived notes flow
- tag listing and tag detail note views
- search route structure
- settings pages for color theme, font theme, and password changes
- theme switching support
- toast-based flash messages
- typed utilities for font theme handling

### In Progress

- polishing UI
- finalizing settings interactions
- tightening note creation and editing flows

### Planned / Likely Next Steps

- full CRUD flow improvements for notes
- stronger empty, loading, and error states
- backend or database-backed persistence
- improved accessibility review across forms and dashboard interactions
- test coverage for critical user flows

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- `next-themes`
- `react-hot-toast`
- `@svgr/webpack`

## Project Structure

```text
app/
  (app)/          authenticated application routes
  (auth)/         authentication routes
  actions/        app actions such as flash message handling
  assets/         local data and static assets
  components/     reusable UI components
utils/            shared utilities
```

## Running Locally

Install dependencies:

```
pnpm install
```

Start the development server:

```
pnpm dev
```
