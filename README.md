# Trip planner demo

A modern travel planning application built with React, TypeScript, and Tailwind CSS.

## Project Overview

Gensee Trip is an interactive travel planning application that helps users create and manage their travel itineraries. The application features an AI-powered chat interface for trip planning and an interactive globe for destination exploration. 

## Technologies Used

This project is built with:

- **Vite** - Fast build tool and development server
- **TypeScript** - Type-safe JavaScript
- **React** - UI library
- **shadcn-ui** - Modern component library
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **TanStack Query** - Data fetching and caching
- **Globe.gl** - Interactive 3D globe visualization

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <REPOSITORY_URL>
cd trip-planner-demo
```

2. Install dependencies:
```bash
npm install
```

3. Setup your backend that runs the two agents provided in the agents folder

4. Specify the backend URL in the .env file, the .env file should be 
```
VITE_BACKEND_URL=<YOUR BACKEND URL>
```

5. Start the development server:
```bash
npm run dev
```

6. Open your browser and navigate to `http://localhost:8080`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build for development
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Project Structure

```
src/
├── components/     # React components
├── pages/         # Page components
├── services/      # API and service functions
├── hooks/         # Custom React hooks
├── lib/           # Utility functions
└── config/        # Configuration files
```

## Features

- **AI Chat Interface** - Interactive chat for travel planning
- **Interactive Globe** - 3D globe for destination exploration
- **Itinerary Management** - Create and manage travel plans
- **Responsive Design** - Works on desktop and mobile devices
- **Modern UI** - Clean and intuitive user interface

