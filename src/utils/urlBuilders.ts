type UrlBuilderInput = {
  location: string;
  radiusMiles: number;
  query: string;
};

function toEncodedQuery(query: string): string {
  return encodeURIComponent(query.trim());
}

export function buildLinkedInSearchUrl(input: UrlBuilderInput): string {
  const params = new URLSearchParams({
    keywords: input.query.trim(),
    location: input.location.trim(),
    distance: String(input.radiusMiles)
  });

  return `https://www.linkedin.com/jobs/search/?${params.toString()}`;
}

export function buildIndeedSearchUrl(input: UrlBuilderInput): string {
  const base = "https://www.indeed.com/jobs";
  const query = toEncodedQuery(input.query);
  const location = encodeURIComponent(input.location.trim());

  return `${base}?q=${query}&l=${location}&radius=${input.radiusMiles}`;
}

export function buildZipRecruiterSearchUrl(input: UrlBuilderInput): string {
  const base = "https://www.ziprecruiter.com/jobs-search";
  const query = toEncodedQuery(input.query);
  const location = encodeURIComponent(input.location.trim());

  return `${base}?search=${query}&location=${location}&radius=${input.radiusMiles}`;
}

export function buildHealthECareersSearchUrl(input: UrlBuilderInput): string {
  const base = "https://www.healthecareers.com/search-jobs";
  const query = toEncodedQuery(input.query);
  const location = encodeURIComponent(input.location.trim());

  return `${base}?keywords=${query}&location=${location}&radius=${input.radiusMiles}`;
}

export function buildPracticeLinkSearchUrl(input: UrlBuilderInput): string {
  const base = "https://jobs.practicelink.com/jobboard/jobsearchresults";
  const query = toEncodedQuery(input.query);
  const location = encodeURIComponent(input.location.trim());

  return `${base}?keywords=${query}&location=${location}&radius=${input.radiusMiles}`;
}
