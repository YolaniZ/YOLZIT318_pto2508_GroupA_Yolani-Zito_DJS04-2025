/**
 * Search, sort, and genre controls for the podcast browser.
 *
 * @param {object} props Control props.
 * @param {Array<object>} props.genres Genre metadata list.
 * @param {string} props.searchQuery Current search query.
 * @param {Array<number>} props.selectedGenreIds Selected genre identifiers.
 * @param {string} props.sortKey Active sort key.
 * @param {Function} props.onSearchChange Search input setter.
 * @param {Function} props.onSortChange Sort setter.
 * @param {Function} props.onGenresChange Genre setter.
 * @param {Function} props.onClearFilters Clears the active controls.
 * @returns {JSX.Element} Control panel.
 */
export function PodcastControls({
  genres,
  searchQuery,
  selectedGenreIds,
  sortKey,
  onSearchChange,
  onSortChange,
  onGenresChange,
  onClearFilters,
}) {
  function toggleGenre(genreId) {
    onGenresChange(
      selectedGenreIds.includes(genreId)
        ? selectedGenreIds.filter((currentGenreId) => currentGenreId !== genreId)
        : [...selectedGenreIds, genreId],
    );
  }

  return (
    <section className="controls-panel" aria-label="Podcast filters">
      <label className="field">
        <span>Search by title</span>
        <input
          type="search"
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search podcasts, episodes, or creators..."
        />
      </label>

      <label className="field">
        <span>Sort results</span>
        <select value={sortKey} onChange={(event) => onSortChange(event.target.value)}>
          <option value="newest">Newest first</option>
          <option value="title-asc">Title A-Z</option>
          <option value="title-desc">Title Z-A</option>
        </select>
      </label>

      <div className="genre-panel">
        <div className="genre-panel-head">
          <span>Filter by genre</span>
          <button type="button" className="ghost-button" onClick={onClearFilters}>
            Reset all
          </button>
        </div>

        <div className="genre-grid">
          {genres.map((genre) => {
            const isActive = selectedGenreIds.includes(genre.id);

            return (
              <button
                key={genre.id}
                type="button"
                className={isActive ? 'genre-chip genre-chip-active' : 'genre-chip'}
                onClick={() => toggleGenre(genre.id)}
              >
                <span>{genre.title}</span>
                <span className="genre-chip-count">{genre.shows.length}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}