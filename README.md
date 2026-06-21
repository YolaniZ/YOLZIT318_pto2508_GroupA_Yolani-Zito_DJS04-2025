# DSJ04 React Podcast App

An advanced podcast browsing app built with React and Vite. It fetches preview data from the public podcast API, maps genre IDs to titles from the local `data.js` file, and keeps search, sort, genre filters, and pagination in sync through a single state flow.

## Features

- Live title search that matches any part of a podcast name.
- Sort options for newest first, title A-Z, and title Z-A.
- Multi-select genre filtering with visible active chips.
- Pagination that respects the current search, sort, and filter state.
- Responsive card layout with loading, empty, and error states.

## Setup

1. Install dependencies with `npm install`.
2. Start the development server with `npm run dev`.
3. Build the production bundle with `npm run build`.

## Project Structure

- `src/App.jsx` handles the data loading and shared UI state.
- `src/lib/podcastUtils.js` contains the search, sort, filter, and pagination helpers.
- `src/components/` contains the reusable controls, cards, and pagination UI.
- `data.js` contains the genre metadata used to label the API genre IDs.

## Notes

- The app fetches from `https://podcast-api.netlify.app`.
- Genre titles are taken from the local `data.js` mapping because the API only returns genre IDs.
- The page keeps controls and visible results aligned as the user changes search, filter, sort, or page.
