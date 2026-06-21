/**
 * Utility helpers for podcast search, sort, filter, and pagination.
 */

/**
 * Builds a lookup map from genre identifiers to genre titles.
 *
 * @param {Array<object>} genreList List of genre records.
 * @returns {Map<number, string>} Genre lookup table.
 */
export function buildGenreLookup(genreList) {
  return new Map(genreList.map((genre) => [genre.id, genre.title]));
}

/**
 * Normalises free-form text for case-insensitive comparisons.
 *
 * @param {string} value Text to normalise.
 * @returns {string} Normalised text.
 */
export function normalizeText(value) {
  return value.trim().toLowerCase();
}

/**
 * Sorts podcast previews by the selected key.
 *
 * @param {Array<object>} podcastList Podcast list.
 * @param {string} sortKey Sort mode.
 * @returns {Array<object>} Sorted podcast list.
 */
export function sortPodcastList(podcastList, sortKey) {
  const sortedList = [...podcastList];

  switch (sortKey) {
    case 'title-asc':
      return sortedList.sort((left, right) => left.title.localeCompare(right.title));
    case 'title-desc':
      return sortedList.sort((left, right) => right.title.localeCompare(left.title));
    case 'newest':
    default:
      return sortedList.sort((left, right) => new Date(right.updated) - new Date(left.updated));
  }
}

/**
 * Filters a podcast list by text query and selected genre identifiers.
 *
 * @param {Array<object>} podcastList Podcast list.
 * @param {string} searchQuery Search text.
 * @param {Array<number>} selectedGenreIds Active genre filters.
 * @returns {Array<object>} Filtered list.
 */
export function filterPodcasts(podcastList, searchQuery, selectedGenreIds) {
  const normalisedQuery = normalizeText(searchQuery);

  return podcastList.filter((podcast) => {
    const titleMatches =
      normalisedQuery.length === 0 || normalizeText(podcast.title).includes(normalisedQuery);
    const genreMatches =
      selectedGenreIds.length === 0 ||
      selectedGenreIds.some((genreId) => podcast.genres.includes(genreId));

    return titleMatches && genreMatches;
  });
}

/**
 * Returns the podcasts for the current page.
 *
 * @param {Array<object>} podcastList Podcast list.
 * @param {number} currentPage Current page number.
 * @param {number} pageSize Page size.
 * @returns {Array<object>} Page slice.
 */
export function paginateList(podcastList, currentPage, pageSize) {
  const startIndex = (currentPage - 1) * pageSize;
  return podcastList.slice(startIndex, startIndex + pageSize);
}

/**
 * Formats the updated date for display.
 *
 * @param {string} value ISO date string.
 * @returns {string} Readable date string.
 */
export function formatUpdatedDate(value) {
  return new Intl.DateTimeFormat('en-ZA', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(value));
}