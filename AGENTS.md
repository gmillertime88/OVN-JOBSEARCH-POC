# AGENTS.md

## Project Goal
Build a lightweight local proof of concept for job discovery across external platforms.

## Working Rules
- Use compliant outbound search URL generation only
- Do not implement scraping
- Do not implement automated login
- Do not implement browser automation against LinkedIn, Indeed, or any other third-party platform
- Keep the first version simple, readable, and demo-friendly

## Technical Preferences
- Use TypeScript
- Prefer a simple React app
- Vite is acceptable for speed
- No backend is required for v1 unless there is a strong reason
- Organize logic into small reusable modules
- Put URL generation logic in utility files
- Keep components small and easy to understand

## UX Expectations
- Create a clean single-page interface
- Include a form for ZIP code, radius, role/title, and up to 3 keywords
- Validate inputs clearly
- Show generated links in a clean results section
- Label links by platform and search intent
- Include a short message explaining that clicking opens the original platform

## Validation Rules
- ZIP code should be 5 digits
- Radius should be numeric and reasonable
- Role/title is required
- Up to 3 keywords only
- Trim empty keywords
- Do not generate malformed URLs

## Output Expectations
- Produce multiple useful search variants when appropriate
- Keep labels human-readable
- Make the code easy to extend later for additional job platforms

## Code Quality
- Use clear naming
- Comment business logic where useful
- Avoid unnecessary abstraction
- Include a concise README section explaining how to run the app