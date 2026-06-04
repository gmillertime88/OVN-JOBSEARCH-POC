import { useState } from "react";
import { ResultsPanel } from "./components/ResultsPanel";
import { SearchForm } from "./components/SearchForm";
import type { SearchInputs, SearchResult, ValidationErrors } from "./types";
import ptLogo from "./assets/PT Logo.png";
import { generateSearchResults } from "./utils/searchGenerator";
import { validateSearchInputs } from "./utils/validation";

const INITIAL_INPUTS: SearchInputs = {
  location: "",
  radiusMiles: "25",
  roleTitle: "",
  keywords: ["", "", ""]
};

export default function App() {
  const [inputs, setInputs] = useState<SearchInputs>(INITIAL_INPUTS);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [results, setResults] = useState<SearchResult[]>([]);

  function handleInputChange(field: keyof SearchInputs, value: string | string[]): void {
    setInputs((prev: SearchInputs) => ({
      ...prev,
      [field]: value
    }));

    setErrors((prev: ValidationErrors) => {
      if (!prev[field]) {
        return prev;
      }

      const next = { ...prev };
      delete next[field];
      return next;
    });
  }

  function handleSubmit(): void {
    const nextErrors = validateSearchInputs(inputs);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setResults([]);
      return;
    }

    setResults(generateSearchResults(inputs));
  }

  function handleReset(): void {
    setInputs(INITIAL_INPUTS);
    setErrors({});
    setResults([]);
  }

  return (
    <>
      <header className="site-header" aria-label="ProactiveTech header">
        <div className="site-header-inner">
          <img className="site-logo" src={ptLogo} alt="ProactiveTech" />
        </div>
      </header>

      <main className="app-shell">
        <header className="app-header">
          <p className="brand-kicker">Job Discovery Proof of Concept</p>
          <h1>ProactiveTech Job Board</h1>
          <p>
            Generate compliant outbound searches for LinkedIn, Indeed, ZipRecruiter, Health eCareers,
            PracticeLink, ASCO Career Center, and The Ladders using location, role, and optional keywords.
          </p>
        </header>

        <section className="app-grid">
          <SearchForm
            values={inputs}
            errors={errors}
            onSubmit={handleSubmit}
            onInputChange={handleInputChange}
            onReset={handleReset}
          />
          <ResultsPanel results={results} />
        </section>
      </main>
    </>
  );
}
