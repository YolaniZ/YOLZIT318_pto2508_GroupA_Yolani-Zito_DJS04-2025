/**
 * Card for an individual podcast preview.
 *
 * @param {object} props Card props.
 * @param {object} props.podcast Podcast preview.
 * @param {Map<number, string>} props.genreLookup Genre ID to title lookup.
 * @param {Function} props.formatUpdatedDate Formatter for the updated timestamp.
 * @returns {JSX.Element} Podcast card.
 */
export function PodcastCard({ podcast, genreLookup, formatUpdatedDate }) {
  return (
    <article className="podcast-card">
      <img className="podcast-art" src={podcast.image} alt={podcast.title} loading="lazy" />

      <div className="podcast-card-body">
        <div className="podcast-card-topline">
          <span>{formatUpdatedDate(podcast.updated)}</span>
          <span>
            {podcast.seasons} season{podcast.seasons === 1 ? '' : 's'}
          </span>
        </div>

        <h3>{podcast.title}</h3>
        <p className="podcast-description">{podcast.description}</p>

        <div className="genre-tags" aria-label="Genres">
          {podcast.genres.map((genreId) => (
            <span key={genreId} className="genre-tag">
              {genreLookup.get(genreId) || `Genre ${genreId}`}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}