import type { SearchPlatform, SearchResult } from "../types";

type LabelContext = {
  platform: SearchPlatform;
  variant: SearchResult["variant"];
  roleTitle: string;
  keywords: string[];
  query: string;
};

function variantDescription(context: LabelContext): string {
  if (context.variant === "Base") {
    return `Base role search for \"${context.roleTitle}\"`;
  }

  if (context.variant === "Role + Keywords") {
    return `Role with all keywords (${context.keywords.join(", ")})`;
  }

  if (context.variant === "Single Keyword") {
    return `Role with single keyword variant (\"${context.query}\")`;
  }

  return `Broadened role variant (\"${context.query}\")`;
}

export function buildSearchLabel(context: LabelContext): string {
  return `${context.platform} - ${variantDescription(context)}`;
}
