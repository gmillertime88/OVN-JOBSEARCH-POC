import type { SearchResult } from "../types";

type ResultsPanelProps = {
  results: SearchResult[];
};

function toPlatformClass(platform: SearchResult["platform"]): string {
  return platform.toLowerCase().replace(/\s+/g, "-");
}

export function ResultsPanel({ results }: ResultsPanelProps) {
  if (results.length === 0) {
    return (
      <section className="results-panel empty">
        <h2>Results</h2>
        <p>Enter search criteria and generate links to view outbound results.</p>
      </section>
    );
  }

  return (
    <section className="results-panel">
      <h2>Generated Searches</h2>
      <p className="panel-note">
        Clicking a link opens the original platform in a new tab where the user can review and apply.
      </p>

      <ul className="results-list">
        {results.map((result) => (
          <li key={result.id} className={`result-card platform-${toPlatformClass(result.platform)}`}>
            <div className="result-top-row">
              <p className="result-platform">{result.platform}</p>
              <span className="variant-chip">{result.variant}</span>
            </div>
            <p className="result-label">{result.label}</p>
            <p className="result-query">Query: {result.query}</p>
            <a href={result.url} target="_blank" rel="noreferrer" className="result-link">
              Open Search
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
