import { useEffect, useMemo, useState } from "react";
import { ResultsPanel } from "./components/ResultsPanel";
import { SearchForm } from "./components/SearchForm";
import type { SearchInputs, SearchResult, ValidationErrors } from "./types";
import { generateSearchResults } from "./utils/searchGenerator";
import { sanitizeKeywords, sanitizeLocation, sanitizeRoleTitle } from "./utils/validation";
import { validateSearchInputs } from "./utils/validation";

const INITIAL_INPUTS: SearchInputs = {
  location: "",
  radiusMiles: "25",
  roleTitle: "",
  keywords: ["", "", ""]
};

const FORM_STORAGE_KEY = "ovn-job-search-form-v1";

function toPersistedInputs(raw: Partial<SearchInputs>): SearchInputs {
  return {
    location: sanitizeLocation((raw.location ?? "").toString()),
    radiusMiles: (raw.radiusMiles ?? "25").toString(),
    roleTitle: sanitizeRoleTitle((raw.roleTitle ?? "").toString()),
    keywords: [...sanitizeKeywords(Array.isArray(raw.keywords) ? raw.keywords : []), "", ""].slice(0, 3)
  };
}

export default function App() {
  const [inputs, setInputs] = useState<SearchInputs>(() => {
    const persisted = window.localStorage.getItem(FORM_STORAGE_KEY);
    if (!persisted) {
      return INITIAL_INPUTS;
    }

    try {
      return toPersistedInputs(JSON.parse(persisted) as Partial<SearchInputs>);
    } catch {
      return INITIAL_INPUTS;
    }
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [results, setResults] = useState<SearchResult[]>([]);

  const hasPersistedValues = useMemo(
    () =>
      Boolean(inputs.location || inputs.roleTitle || inputs.keywords.some(Boolean)) ||
      inputs.radiusMiles !== INITIAL_INPUTS.radiusMiles,
    [inputs]
  );

  useEffect(() => {
    window.localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(inputs));
  }, [inputs]);

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
    window.localStorage.removeItem(FORM_STORAGE_KEY);
  }

  return (
    <main className="app-shell">
      <header className="app-header">
        <h1>OVN Job Discovery</h1>
        <p>
          Generate compliant outbound searches for LinkedIn and Indeed using location, role, and optional
          keywords.
        </p>
        {hasPersistedValues ? <p className="saved-note">Form state is saved locally on this device.</p> : null}
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
  );
}
