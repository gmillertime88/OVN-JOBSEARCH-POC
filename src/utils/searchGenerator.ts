import type { SearchInputs, SearchResult } from "../types";
import { buildSearchLabel } from "./labelBuilder";
import {
  buildAscoCareerCenterSearchUrl,
  buildHealthECareersSearchUrl,
  buildIndeedSearchUrl,
  buildLinkedInSearchUrl,
  buildPracticeLinkSearchUrl,
  buildZipRecruiterSearchUrl
} from "./urlBuilders";
import { sanitizeKeywords, sanitizeRoleTitle } from "./validation";

type SearchVariant = {
  type: SearchResult["variant"];
  query: string;
};

function createVariants(roleTitle: string, keywords: string[]): SearchVariant[] {
  const cleanedRole = sanitizeRoleTitle(roleTitle);
  const joinedKeywords = keywords.join(" ");
  const withKeywords = [cleanedRole, joinedKeywords].filter(Boolean).join(" ");

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

    if (keywords.length === 1) {
      variants.push({
        type: "Single Keyword",
        query: `${cleanedRole} ${keywords[0]}`
      });
    }
  }

  const deduped = new Map<string, SearchVariant>();

  variants.forEach((variant) => {
    const key = `${variant.type.toLowerCase()}::${variant.query.toLowerCase()}`;
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

    const zipRecruiterUrl = buildZipRecruiterSearchUrl({
      location,
      radiusMiles,
      query: variant.query
    });

    const healthECareersUrl = buildHealthECareersSearchUrl({
      location,
      radiusMiles,
      query: variant.query
    });

    const practiceLinkUrl = buildPracticeLinkSearchUrl({
      location,
      radiusMiles,
      query: variant.query
    });

    const ascoCareerCenterUrl = buildAscoCareerCenterSearchUrl({
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
      },
      {
        id: `ziprecruiter-${variant.type}-${variant.query.toLowerCase().replace(/\s+/g, "-")}`,
        platform: "ZipRecruiter",
        label: buildSearchLabel({
          platform: "ZipRecruiter",
          variant: variant.type,
          roleTitle,
          keywords,
          query: variant.query
        }),
        query: variant.query,
        url: zipRecruiterUrl,
        variant: variant.type
      },
      {
        id: `healthecareers-${variant.type}-${variant.query.toLowerCase().replace(/\s+/g, "-")}`,
        platform: "Health eCareers",
        label: buildSearchLabel({
          platform: "Health eCareers",
          variant: variant.type,
          roleTitle,
          keywords,
          query: variant.query
        }),
        query: variant.query,
        url: healthECareersUrl,
        variant: variant.type
      },
      {
        id: `practicelink-${variant.type}-${variant.query.toLowerCase().replace(/\s+/g, "-")}`,
        platform: "PracticeLink",
        label: buildSearchLabel({
          platform: "PracticeLink",
          variant: variant.type,
          roleTitle,
          keywords,
          query: variant.query
        }),
        query: variant.query,
        url: practiceLinkUrl,
        variant: variant.type
      },
      {
        id: `asco-career-center-${variant.type}-${variant.query.toLowerCase().replace(/\s+/g, "-")}`,
        platform: "ASCO Career Center",
        label: buildSearchLabel({
          platform: "ASCO Career Center",
          variant: variant.type,
          roleTitle,
          keywords,
          query: variant.query
        }),
        query: variant.query,
        url: ascoCareerCenterUrl,
        variant: variant.type
      }
    ];
  });
}
