import type { SearchInputs, ValidationErrors } from "../types";

const ZIP_PATTERN = /^\d{5}$/;
const CITY_STATE_PATTERN = /^[A-Za-z][A-Za-z\s.'-]*,\s*[A-Za-z]{2}$/;
const MIN_RADIUS = 1;
const MAX_RADIUS = 100;
const MIN_ROLE_LENGTH = 2;
const MAX_ROLE_LENGTH = 80;
const KEYWORD_PATTERN = /^[a-zA-Z0-9\s\-/+&.,()']+$/;

export function sanitizeKeywords(rawKeywords: string[]): string[] {
  return rawKeywords.map((keyword) => keyword.trim()).filter(Boolean).slice(0, 3);
}

export function sanitizeRoleTitle(roleTitle: string): string {
  return roleTitle.trim().replace(/\s+/g, " ");
}

export function sanitizeLocation(location: string): string {
  return location.trim().replace(/\s+/g, " ");
}

function isValidLocation(location: string): boolean {
  return ZIP_PATTERN.test(location) || CITY_STATE_PATTERN.test(location);
}

export function validateSearchInputs(inputs: SearchInputs): ValidationErrors {
  const errors: ValidationErrors = {};

  const location = sanitizeLocation(inputs.location);
  const roleTitle = sanitizeRoleTitle(inputs.roleTitle);
  const keywords = sanitizeKeywords(inputs.keywords);
  const parsedRadius = Number(inputs.radiusMiles);

  if (!location) {
    errors.location = "Location is required.";
  } else if (!isValidLocation(location)) {
    errors.location = "Enter a 5-digit ZIP or City, ST (example: Trenton, NJ).";
  }

  if (!Number.isFinite(parsedRadius) || !Number.isInteger(parsedRadius)) {
    errors.radiusMiles = "Radius must be a whole number.";
  } else if (parsedRadius < MIN_RADIUS || parsedRadius > MAX_RADIUS) {
    errors.radiusMiles = `Radius must be between ${MIN_RADIUS} and ${MAX_RADIUS} miles.`;
  }

  if (!roleTitle) {
    errors.roleTitle = "Role/title is required.";
  } else if (roleTitle.length < MIN_ROLE_LENGTH || roleTitle.length > MAX_ROLE_LENGTH) {
    errors.roleTitle = `Role/title must be between ${MIN_ROLE_LENGTH} and ${MAX_ROLE_LENGTH} characters.`;
  } else if (!KEYWORD_PATTERN.test(roleTitle)) {
    errors.roleTitle = "Role/title contains unsupported characters.";
  }

  if (inputs.keywords.length > 3) {
    errors.keywords = "Provide up to 3 keywords only.";
  } else if (keywords.length !== inputs.keywords.filter((k) => k.length > 0).length) {
    errors.keywords = "Keywords cannot be blank spaces.";
  } else if (keywords.some((keyword) => keyword.length > 30)) {
    errors.keywords = "Each keyword must be 30 characters or less.";
  } else if (keywords.some((keyword) => !KEYWORD_PATTERN.test(keyword))) {
    errors.keywords = "Keywords contain unsupported characters.";
  }

  return errors;
}
