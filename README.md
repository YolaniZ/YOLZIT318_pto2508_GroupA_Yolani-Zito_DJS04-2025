# Podcast Browser App

## Overview

This project is a React + Vite podcast browser that allows users to search, sort, filter, and paginate podcast previews from a public API. The app keeps all controls synchronised in one state flow so users can move between pages without losing their selected query, sort option, or genre filters.

## Core Features

- Live title search that matches any part of a podcast title.
- Sorting by:
	- Newest first (updated date)
	- Title A-Z
	- Title Z-A
- Multi-select genre filtering with interactive chips.
- Pagination that respects the active search, sort, and filter state.
- Loading, error, and empty-result states for clearer feedback.

## Responsive Experience

The UI is designed for three device bands:

- Desktop:
	- Wider two-column content areas and denser information layout.
- Tablet:
	- Hero and controls adapt to balanced stacking while retaining a two-card grid where possible.
- Phone:
	- Single-column flow, simplified spacing, full-width filter chips, and mobile-optimized card proportions.

## Data Sources

- Podcast previews: https://podcast-api.netlify.app
- Genre metadata (ID to title mapping): local `data.js`

## Tech Stack

- React 18
- Vite 5
- Plain CSS (responsive breakpoints and component-level styling)

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Build for production:

```bash
npm run build
```

4. Preview the production build locally:

```bash
npm run preview
```

## Available Scripts

- `npm run dev` starts Vite in development mode.
- `npm run build` creates the production bundle in `dist/`.
- `npm run preview` serves the built app locally.

## Project Structure

- `src/App.jsx`
	- Main app shell, API loading, and shared UI state.
- `src/lib/podcastUtils.js`
	- Pure helper functions for sorting, filtering, formatting, and pagination.
- `src/components/PodcastControls.jsx`
	- Search, sort, and genre filter controls.
- `src/components/PodcastCard.jsx`
	- Podcast preview card UI.
- `src/components/Pagination.jsx`
	- Pagination controls and navigation.
- `src/styles.css`
	- Global styling and responsive breakpoints.
- `data.js`
	- Genre metadata used to resolve API genre IDs.

## Troubleshooting

- If the app loads but no podcasts appear, check internet access to the API host.
- If npm commands fail in PowerShell, use `npm.cmd` instead of `npm`.
- If Git push fails with host resolution errors, verify DNS and proxy settings.

## Deliverables Checklist

Use this checklist before submitting:

- [x] React app scaffolded and running with Vite.
- [x] Podcast data fetched from the provided API endpoint.
- [x] Genre IDs mapped to titles using local `data.js`.
- [x] Live search implemented and integrated with filters/sorting.
- [x] Sort options implemented (Newest, A-Z, Z-A).
- [x] Genre filtering implemented (multi-select chips).
- [x] Pagination implemented and state-aware.
- [x] Shared state flow keeps controls synchronised.
- [x] Reusable component structure in place.
- [x] JSDoc added for major functions/modules.
- [x] Responsive behavior for phone, tablet, and desktop.
- [x] README includes setup and project details.

## Assessment Criteria Mapping

This section maps project requirements to implementation areas:

1. Search Functionality
	- Implemented in `src/components/PodcastControls.jsx` and applied through filtering logic in `src/lib/podcastUtils.js`.

2. Sorting Options
	- Implemented via sort select control in `src/components/PodcastControls.jsx`.
	- Applied through `sortPodcastList` in `src/lib/podcastUtils.js`.

3. Filtering
	- Genre chip multi-select implemented in `src/components/PodcastControls.jsx`.
	- Filter state application handled by `filterPodcasts` in `src/lib/podcastUtils.js`.

4. Pagination
	- Navigation controls implemented in `src/components/Pagination.jsx`.
	- Page slicing handled by `paginateList` in `src/lib/podcastUtils.js`.

5. State Synchronisation
	- Central state management in `src/App.jsx` for search, sort, filters, current page, and derived results.

6. Code Quality & Maintainability
	- Reusable components in `src/components/`.
	- Utility logic isolated in `src/lib/podcastUtils.js`.
	- JSDoc comments included for core functions.

7. Polished User Experience
	- Responsive breakpoints and device-specific layout refinement in `src/styles.css`.
	- Clear loading, error, and empty states in `src/App.jsx`.
