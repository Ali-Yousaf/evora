# Evora Event Management System

A React event discovery app for exploring Ticketmaster events, viewing event details, and managing a personal event list. Authentication and registrations are simulated in the browser and persisted with Local Storage.

## Requirements

- Node.js 20.19+ or 22.12+
- A Ticketmaster Discovery API key from [developer.ticketmaster.com](https://developer.ticketmaster.com/)

## Setup

1. Install dependencies:

	```sh
	npm install
	```

2. Create a `.env.local` file in the project root and add your API key:

	```env
	VITE_TICKETMASTER_API_KEY=your_ticketmaster_api_key
	```

3. Start the development server:

	```sh
	npm run dev
	```

Vite reads environment files when it starts. Restart the server after changing the API key. Never commit `.env.local` or use a real password with this frontend-only authentication demo.

## Available Commands

- `npm run dev` starts the local development server.
- `npm run lint` checks the JavaScript and JSX source.
- `npm run build` creates the production bundle in `dist/`.
- `npm run preview` serves the production bundle locally.

## Features

- Search and filter upcoming Ticketmaster events by category.
- View event date, time, venue, location, category, and available description.
- Create an account, log in, and log out; the signed-in session persists across refreshes.
- Register for events, prevent duplicate registrations, and cancel upcoming registrations.
- View upcoming and completed registrations in My Events.

Authentication is a local simulation, not suitable for production. Accounts and event registrations are stored in the browser's Local Storage and are specific to that browser.
