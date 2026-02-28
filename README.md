# QuickHire Frontend

QuickHire is a modern job board application designed to connect job seekers with employers. This is the frontend part of the application, built with Next.js and Tailwind CSS.

## Features

- **Hero Section**: Dynamic search and call-to-action.
- **Job Categories**: Browse jobs by category.
- **Featured & Latest Jobs**: Stay updated with the newest opportunities.
- **Job Application Flow**: Easy-to-use application process.
- **Responsive Design**: Fully optimized for mobile and desktop.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: React Hooks
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **HTTP Client**: [Axios](https://axios-http.com/)

## Project Structure

```text
quickhire-frontend/
├── app/                # Next.js app directory (pages & layouts)
├── components/         # Reusable UI components
│   ├── home/           # Hero, Categories, Job sections
│   ├── layout/         # Navbar, Footer
│   └── ui/             # Generic UI elements (buttons, inputs)
├── public/             # Static assets (images, SVGs)
├── services/           # API integration services (axios)
├── types/              # TypeScript interfaces/types
└── lib/                # Utility functions
```

## Local Setup

### 1. Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### 2. Installation

```bash
git clone https://github.com/abdulahaddf/QuickHire-frontend.git
cd QuickHire-frontend
npm install
```

### 3. Environment Variables

Create a `.env.local` file in the `QuickHire-frontend` directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 4. Running the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

- `npm run dev`: Runs the app in development mode.
- `npm run build`: Builds the app for production.
- `npm run start`: Runs the built app in production mode.
- `npm run lint`: Lints the codebase.
