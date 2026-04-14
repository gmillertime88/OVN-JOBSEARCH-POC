export type SearchInputs = {
  location: string;
  radiusMiles: string;
  roleTitle: string;
  keywords: string[];
};

export type ValidationErrors = Partial<Record<keyof SearchInputs, string>>;

export type SearchPlatform =
  | "LinkedIn"
  | "Indeed"
  | "ZipRecruiter"
  | "Health eCareers"
  | "PracticeLink"
  | "ASCO Career Center"
  | "The Ladders";

export type SearchVariantType =
  | "Base"
  | "Role + Keywords"
  | "Single Keyword"
  | "Broadened";

export type SearchResult = {
  id: string;
  platform: SearchPlatform;
  label: string;
  query: string;
  url: string;
  variant: SearchVariantType;
};
