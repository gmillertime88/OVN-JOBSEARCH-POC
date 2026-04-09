# Current Task

Build the first working version of the OVN Job Search proof of concept.

## What to Build
Create a local web application that:
1. accepts a ZIP code
2. accepts a radius in miles
3. accepts a required job role/title
4. accepts up to 3 optional keywords
5. generates targeted LinkedIn and Indeed search URLs
6. presents those results clearly to the user

## Functional Requirements
- Build a simple input form
- Validate the inputs
- Generate search URLs for:
  - LinkedIn
  - Indeed
- Display generated results as clickable links
- Include readable labels for each generated search

## Suggested Search Variants
Generate:
- a base search using the role/title
- a search using role/title plus all provided keywords
- optionally, one broadened or alternate variant if it improves usefulness

## UI Requirements
- Single-page layout is fine
- Keep the interface clean and easy to demo
- Show validation messages clearly
- Show results in a structured card/list format

## Deliverables
- working UI
- URL builder utilities
- input validation
- clean project structure
- short run instructions in README

## Do Not Do
- no scraping
- no login automation
- no live fetching of job data from LinkedIn or Indeed
- no backend unless truly necessary