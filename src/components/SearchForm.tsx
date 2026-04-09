import type { ChangeEvent, FormEvent } from "react";
import type { SearchInputs, ValidationErrors } from "../types";

type SearchFormProps = {
  values: SearchInputs;
  errors: ValidationErrors;
  onSubmit: () => void;
  onReset: () => void;
  onInputChange: (field: keyof SearchInputs, value: string | string[]) => void;
};

function updateKeyword(
  event: ChangeEvent<HTMLInputElement>,
  keywords: string[],
  index: number,
  onInputChange: SearchFormProps["onInputChange"]
): void {
  const nextKeywords = [...keywords];
  nextKeywords[index] = event.target.value;
  onInputChange("keywords", nextKeywords);
}

export function SearchForm({ values, errors, onSubmit, onReset, onInputChange }: SearchFormProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    onSubmit();
  }

  return (
    <form className="search-form" onSubmit={handleSubmit} noValidate>
      <h2>Search Criteria</h2>

      <label htmlFor="location">Location (ZIP or City, ST)</label>
      <input
        id="location"
        name="location"
        type="text"
        placeholder="Calabasas, CA 91302"
        value={values.location}
        onChange={(event) => onInputChange("location", event.target.value)}
      />
      {errors.location ? <p className="field-error">{errors.location}</p> : null}

      <label htmlFor="radiusMiles">Radius (miles)</label>
      <input
        id="radiusMiles"
        name="radiusMiles"
        type="number"
        min={1}
        max={100}
        placeholder="25"
        value={values.radiusMiles}
        onChange={(event) => onInputChange("radiusMiles", event.target.value.replace(/[^\d]/g, ""))}
      />
      {errors.radiusMiles ? <p className="field-error">{errors.radiusMiles}</p> : null}

      <label htmlFor="roleTitle">Role</label>
      <input
        id="roleTitle"
        name="roleTitle"
        type="text"
        placeholder="Pharmacologist"
        value={values.roleTitle}
        onChange={(event) => onInputChange("roleTitle", event.target.value)}
      />
      {errors.roleTitle ? <p className="field-error">{errors.roleTitle}</p> : null}

      <fieldset className="keywords-group">
        <legend>Optional keywords (up to 3)</legend>
        {[0, 1, 2].map((index) => (
          <input
            key={index}
            type="text"
            placeholder={`Keyword ${index + 1}`}
            value={values.keywords[index] ?? ""}
            onChange={(event) => updateKeyword(event, values.keywords, index, onInputChange)}
          />
        ))}
      </fieldset>
      {errors.keywords ? <p className="field-error">{errors.keywords}</p> : null}

      <button type="submit" className="primary-btn">
        Generate Search Links
      </button>
      <button type="button" className="secondary-btn" onClick={onReset}>
        Clear Form
      </button>
    </form>
  );
}
