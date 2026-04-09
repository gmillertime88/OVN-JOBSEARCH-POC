import type { SearchInputs, SearchResult } from "../types";
import { buildSearchLabel } from "./labelBuilder";
import { buildIndeedSearchUrl, buildLinkedInSearchUrl } from "./urlBuilders";
import { sanitizeKeywords, sanitizeRoleTitle } from "./validation";

type SearchVariant = {
  type: SearchResult["variant"];
  query: string;
};

function toBroadenedRole(roleTitle: string): string {
  return roleTitle
    .split(/\s+/)
    .filter((word) => word.length > 3)
    .slice(0, 2)
    .join(" ") || roleTitle;
}

function createVariants(roleTitle: string, keywords: string[]): SearchVariant[] {
  const cleanedRole = sanitizeRoleTitle(roleTitle);
  const joinedKeywords = keywords.join(" ");
  const withKeywords = [cleanedRole, joinedKeywords].filter(Boolean).join(" ");
  const broadened = toBroadenedRole(cleanedRole);

  const variants: SearchVariant[] = [
    {
      type: "Base",
      query: cleanedRole
    }
  ];

  if (keywords.length > 0) {
    variants.push({
      type: "Role + Keywords",
      query: withKeywords
    });

    keywords.forEach((keyword) => {
      variants.push({
        type: "Single Keyword",
        query: `${cleanedRole} ${keyword}`
      });
    });
  }

  if (broadened.toLowerCase() !== cleanedRole.toLowerCase()) {
    variants.push({
      type: "Broadened",
      query: broadened
    });
  }

  const deduped = new Map<string, SearchVariant>();

  variants.forEach((variant) => {
    const key = variant.query.toLowerCase();
    if (!deduped.has(key)) {
      deduped.set(key, variant);
    }
  });

  return [...deduped.values()];
}

export function generateSearchResults(inputs: SearchInputs): SearchResult[] {
  const radiusMiles = Number(inputs.radiusMiles);
  const location = inputs.location.trim();
  const roleTitle = sanitizeRoleTitle(inputs.roleTitle);
  const keywords = sanitizeKeywords(inputs.keywords);

  const variants = createVariants(roleTitle, keywords);

  return variants.flatMap((variant) => {
    const linkedinUrl = buildLinkedInSearchUrl({
      location,
      radiusMiles,
      query: variant.query
    });

    const indeedUrl = buildIndeedSearchUrl({
      location,
      radiusMiles,
      query: variant.query
    });

    return [
      {
        id: `linkedin-${variant.type}-${variant.query.toLowerCase().replace(/\s+/g, "-")}`,
        platform: "LinkedIn",
        label: buildSearchLabel({
          platform: "LinkedIn",
          variant: variant.type,
          roleTitle,
          keywords,
          query: variant.query
        }),
        query: variant.query,
        url: linkedinUrl,
        variant: variant.type
      },
      {
        id: `indeed-${variant.type}-${variant.query.toLowerCase().replace(/\s+/g, "-")}`,
        platform: "Indeed",
        label: buildSearchLabel({
          platform: "Indeed",
          variant: variant.type,
          roleTitle,
          keywords,
          query: variant.query
        }),
        query: variant.query,
        url: indeedUrl,
        variant: variant.type
      }
    ];
  });
}
