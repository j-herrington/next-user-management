# Nuxt User Management Demo

## Overview
This project is a custom implementation inspired by the [Supabase Nuxt 3 tutorial](https://supabase.com/docs/guides/getting-started/tutorials/with-nuxt-3) for learning purposes. It is built using Nuxt.js and TypeScript, integrating Supabase for backend services. The project demonstrates how to set up authentication, manage user accounts, and handle real-time data updates using Supabase within a Nuxt.js application. It also leverages [Nuxt UI](https://ui.nuxt.com) for the frontend component library, providing a seamless and modern user interface.

## Table of Contents
- [Overview](#overview)
- [Background](#background)
- [Demo](#demo)
- [Requirements](#requirements)
- [Modules Used](#modules-used)
  - [@nuxtjs/color-mode](#nuxtjscolor-mode)
  - [@nuxtjs/supabase](#nuxtjssupabase)
  - [@nuxt/ui](#nuxtui)
- [Installation](#installation)
  - [Using npm](#using-npm)
  - [Using yarn](#using-yarn)
- [Configuration](#configuration)
  - [Using a .env File](#using-a-env-file)
  - [Directly in nuxt.config.ts](#directly-in-nuxtconfigts)
- [Usage](#usage)
  - [Using npm](#using-npm-1)
  - [Using yarn](#using-yarn-1)
- [Project Structure](#project-structure)
- [Dependencies](#dependencies)
  - [Core Dependencies](#core-dependencies)
  - [Dev Dependencies](#dev-dependencies)
- [Features](#features)
- [License](#license)


## Background
This project started as a small, simple demo a few years ago when I was learning Nuxt. Initially, I followed the [Supabase guide](https://supabase.com/docs/guides/getting-started/tutorials/with-nuxt-3) to get started with Nuxt 3 and Supabase integration.

The tutorial used basic inline Tailwind CSS for styling, but I wanted to expand the user interface to gain a deeper understanding of UI development. Initially, I chose Daisy UI for its visually appealing design, but it relied heavily on inline styling and lacked comprehensive components.

A year later, I revisited the project and decided to switch to Nuxt UI. By then, Nuxt UI had significantly progressed, offering a more robust and integrated solution for building user interfaces within the Nuxt ecosystem.

## Demo

<table>
  <tr>
    <td align="center" width="50%">
      <img src="assets/images/Auth.gif" alt="Authentication Page" width="300"/>
      <p><em>Authentication page where users log in.</em></p>
    </td>
    <td align="center" width="50%">
      <img src="assets/images/Account.gif" alt="Account Management Page" width="300"/>
      <p><em>Account management page where users can update their profiles.</em></p>
    </td>
  </tr>
</table>

<table>
  <tr>
    <td align="center">
      <img src="assets/images/ColorMode.gif" alt="Color Mode Gif" width="600"/>
      <p><em>Automatic detection and switching of color modes.</em></p>
    </td>
  </tr>
</table>

## Requirements
- Node.js v14 or higher
- npm v6 or higher, or yarn v1.22 or higher
- Supabase account

## Modules Used

### [@nuxtjs/color-mode](https://color-mode.nuxtjs.org)
This module allows for easy implementation of color modes (e.g., dark mode, light mode) within the application. It provides a simple way to manage and switch between different color schemes.

### [@nuxtjs/supabase](https://nuxt.com/modules/supabase)
This module integrates Supabase, an open-source Firebase alternative, into the Nuxt project. It provides backend services such as authentication, database, and storage, making it easier to build full-stack applications.

### [@nuxt/ui](https://ui.nuxt.com/)
Nuxt UI is a component library for Nuxt 3 that includes a set of ready-to-use UI components. It helps in building user interfaces quickly and efficiently, ensuring a consistent design across the application.


## Installation

You can use either `npm` or `yarn` to install the dependencies. Follow the instructions below:

### Using npm

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/your-repo.git
    cd your-repo
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

### Using yarn

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/your-repo.git
    cd your-repo
    ```

2. Install dependencies:

    ```bash
    yarn install
    ```

## Configuration

### Using a .env File

1. Create a `.env` file at the root of the project and add your Supabase credentials:

    ```env
    SUPABASE_URL=your-supabase-url
    SUPABASE_KEY=your-supabase-key
    ```

### Directly in nuxt.config.ts

Alternatively, you can add your Supabase credentials directly in the `nuxt.config.ts` file:

```typescript
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      supabaseUrl: 'your-supabase-url',
      supabaseKey: 'your-supabase-key',
    },
  },
});
```

## Usage

1. Start the development server:

    ### Using npm

    ```bash
    npm run dev
    ```

    ### Using yarn

    ```bash
    yarn dev
    ```

2. Open your browser and navigate to `http://localhost:3000`.

3. For building the project for production, use:

    ### Using npm

    ```bash
    npm run build
    ```

    ### Using yarn

    ```bash
    yarn build
    ```

4. To start the production server, use:

    ### Using npm

    ```bash
    npm run start
    ```

    ### Using yarn

    ```bash
    yarn start
    ```

5. To generate a static version of the project, use:

    ### Using npm

    ```bash
    npm run generate
    ```

    ### Using yarn

    ```bash
    yarn generate
    ```

Make sure to check the `package.json` file for other useful scripts and commands.


## Project Structure

```plaintext
.
├── assets
│   ├── images
│   │   ├── Account.gif
│   │   ├── Auth.gif
│   │   ├── ColorMode.gif
│   ├── main.css
│   └── ...
├── components
│   ├── Auth.tsx
│   ├── Account.tsx
│   ├── Avatar.tsx
│   ├── ColorMode.tsx
│   └── ...
├── composables
│   ├── useNotification.ts
│   └── ...
├── layouts
│   └── default.tsx
├── pages
│   ├── index.tsx
│   └── ...
├── nuxt.config.ts
├── package.json
├── .env
└── ...
```

## Dependencies

### Core Dependencies
- **@nuxtjs/tailwindcss**: 6.11.0
- **@supabase/gotrue-js**: ^2.62.2
- **yup**: 1.4.0

### Dev Dependencies
- **@nuxt/devtools**: latest
- **@nuxt/ui**: ^2.13.0
- **@nuxtjs/color-mode**: ^3.4.1
- **@nuxtjs/supabase**: ^1.2.2
- **nuxt**: ^3.10.1
- **typescript**: ^5.4.5

## Features
- **Authentication**: User authentication using Supabase.
- **Account Management**: Manage user accounts and profiles.
- **Real-time Data**: Handle real-time data updates.
- **UI Components**: Modern and responsive UI components provided by Nuxt UI.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

