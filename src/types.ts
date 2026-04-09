export type SearchInputs = {
  location: string;
  radiusMiles: string;
  roleTitle: string;
  keywords: string[];
};

export type ValidationErrors = Partial<Record<keyof SearchInputs, string>>;

export type SearchPlatform = "LinkedIn" | "Indeed";

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
