# Future Interns - AI Brand Rebrand (Apple)

This project is a modern, static marketing website for a rebranded version of Apple, built with Next.js, Tailwind CSS, and Framer Motion. The goal was to create a visually impressive, responsive, and SEO-optimized site based on the requirements from the Future Interns Full Stack Web Development Task 3.

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Development Server](#running-the-development-server)
- [Component Structure](#component-structure)
- [Deployment](#deployment)

## Project Overview

This project reimagines the Apple website with a focus on AI-driven innovation. It's a static, marketing-focused site designed to be fast, visually engaging, and fully responsive. The branding and content were generated with AI, and the site was built using modern web development tools.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) 14
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Deployment**: Vercel, Netlify, or any static site hosting.

## Features

- **Modern, Apple-inspired UI**: Clean, minimalist design with a focus on typography and visuals.
- **Responsive Design**: Fully optimized for all screen sizes, from mobile to desktop.
- **Animations & Transitions**: Smooth, engaging animations using Framer Motion.
- **SEO Optimized**: Built with Next.js for server-side rendering and SEO best practices.
- **Component-Based Architecture**: Clean, reusable components for easy maintenance and scalability.

## Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v18.x or later recommended)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <project-directory>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

### Running the Development Server

Once the dependencies are installed, you can run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Component Structure

The project is organized into a series of reusable React components located in the `src/components` directory:

-   `Header.tsx`: The main navigation bar.
-   `Hero.tsx`: The main hero section with an animated headline.
-   `Features.tsx`: A grid showcasing the key features of the "new" Apple.
-   `Products.tsx`: An interactive showcase of Apple's core products.
-   `Innovation.tsx`: A section dedicated to AI and innovation, with animated stats.
-   `Testimonials.tsx`: A carousel of customer testimonials.
-   `Newsletter.tsx`: A form for users to subscribe to a newsletter.
-   `Footer.tsx`: The site's footer with links and social media icons.

The main page that assembles these components is `src/app/page.tsx`.

## Deployment

This Next.js application is ready for deployment on any platform that supports Node.js or static site hosting. Vercel (from the creators of Next.js) is the recommended platform for a seamless deployment experience.

1.  **Push your code to a Git repository** (e.g., GitHub, GitLab).
2.  **Import your project into Vercel.**
3.  **Configure the build settings** (Vercel will likely detect the correct settings automatically).
4.  **Deploy!**
