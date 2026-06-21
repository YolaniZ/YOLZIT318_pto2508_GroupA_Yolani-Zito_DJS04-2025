import { useEffect, useMemo, useState } from 'react';
import { genres } from '../data.js';
import {
  buildGenreLookup,
  filterPodcasts,
  formatUpdatedDate,
  paginateList,
  sortPodcastList,
} from './lib/podcastUtils';
import { PodcastCard } from './components/PodcastCard';
import { PodcastControls } from './components/PodcastControls';
import { Pagination } from './components/Pagination';

const PAGE_SIZE = 8;

/**
 * Fetches podcast previews from the public API.
 *
 * @param {object} options Fetch options.
 * @param {AbortSignal} options.signal Abort signal for request cancellation.
 * @returns {Promise<Array<object>>} Podcast preview list.
 */
async function fetchPodcasts({ signal } = {}) {
  const response = await fetch('https://podcast-api.netlify.app', { signal });

  if (!response.ok) {
    throw new Error('Unable to load podcast previews right now.');
  }

  return response.json();
}

/**
 * Main application shell for the podcast browser.
 *
 * @returns {JSX.Element} The rendered app.
 */
export default function App() {
  const [podcasts, setPodcasts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortKey, setSortKey] = useState('newest');
  const [selectedGenreIds, setSelectedGenreIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const genreLookup = useMemo(() => buildGenreLookup(genres), []);

  useEffect(() => {
    const controller = new AbortController();

    async function loadPodcasts() {
      setIsLoading(true);
      setError('');

      try {
        const previewList = await fetchPodcasts({ signal: controller.signal });
        setPodcasts(previewList);
      } catch (loadError) {
        if (loadError.name !== 'AbortError') {
          setError(loadError.message || 'Something went wrong while loading podcasts.');
        }
      } finally {
        setIsLoading(false);
      }
    }

    loadPodcasts();

    return () => controller.abort();
  }, []);

  const sortedPodcasts = useMemo(
    () => sortPodcastList(podcasts, sortKey),
    [podcasts, sortKey],
  );

  const filteredPodcasts = useMemo(
    () => filterPodcasts(sortedPodcasts, searchQuery, selectedGenreIds),
    [searchQuery, selectedGenreIds, sortedPodcasts],
  );

  const totalPages = Math.max(1, Math.ceil(filteredPodcasts.length / PAGE_SIZE));
  const safeCurrentPage = Math.min(currentPage, totalPages);

  useEffect(() => {
    setCurrentPage((previousPage) => Math.min(previousPage, totalPages));
  }, [totalPages]);

  const paginatedPodcasts = useMemo(
    () => paginateList(filteredPodcasts, safeCurrentPage, PAGE_SIZE),
    [filteredPodcasts, safeCurrentPage],
  );

  const visibleRangeStart = filteredPodcasts.length === 0 ? 0 : (safeCurrentPage - 1) * PAGE_SIZE + 1;
  const visibleRangeEnd = Math.min(safeCurrentPage * PAGE_SIZE, filteredPodcasts.length);

  return (
    <div className="app-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <main className="app-frame">
        <header className="hero">
          <div>
            <p className="eyebrow">Podcast Browser</p>
          </div>

          <div className="hero-metrics" aria-label="Podcast summary">
            <div>
              <span className="metric-label">Shows loaded</span>
              <strong>{podcasts.length}</strong>
            </div>
            <div>
              <span className="metric-label">Active filters</span>
              <strong>{selectedGenreIds.length}</strong>
            </div>
            <div>
              <span className="metric-label">Results shown</span>
              <strong>{filteredPodcasts.length}</strong>
            </div>
          </div>
        </header>

        <PodcastControls
          genres={genres}
          searchQuery={searchQuery}
          selectedGenreIds={selectedGenreIds}
          sortKey={sortKey}
          onSearchChange={setSearchQuery}
          onSortChange={setSortKey}
          onGenresChange={setSelectedGenreIds}
          onClearFilters={() => {
            setSearchQuery('');
            setSortKey('newest');
            setSelectedGenreIds([]);
          }}
        />

        <section className="results-header" aria-live="polite">
          <div>
            <h2>Browse results</h2>
            <p>
              {filteredPodcasts.length === 0
                ? 'No podcasts match the current search and filters.'
                : `Showing ${visibleRangeStart}-${visibleRangeEnd} of ${filteredPodcasts.length} podcasts.`}
            </p>
          </div>

          <p className="results-note">
            Search matches any part of the title, filters can be combined, and pagination always
            follows the active result set.
          </p>
        </section>

        {isLoading ? (
          <div className="state-panel">Loading podcast previews...</div>
        ) : error ? (
          <div className="state-panel state-panel-error" role="alert">
            <strong>Could not load data.</strong>
            <span>{error}</span>
          </div>
        ) : (
          <>
            <section className="podcast-grid" aria-label="Podcast cards">
              {paginatedPodcasts.map((podcast) => (
                <PodcastCard
                  key={podcast.id}
                  podcast={podcast}
                  genreLookup={genreLookup}
                  formatUpdatedDate={formatUpdatedDate}
                />
              ))}
            </section>

            {filteredPodcasts.length === 0 ? (
              <div className="state-panel state-panel-empty">
                Try a different title search or remove one of the selected genres.
              </div>
            ) : (
              <Pagination
                currentPage={safeCurrentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}