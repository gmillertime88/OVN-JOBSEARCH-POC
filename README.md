# OVN Job Search Proof of Concept

Local React + TypeScript proof of concept that generates outbound job search links for LinkedIn and Indeed based on user-entered criteria.

## What It Does
- Collects:
	- ZIP code
	- radius in miles
	- required role/title
	- up to 3 optional keywords
- Validates inputs before generating links
- Produces multiple search variants:
	- Base role search
	- Role + all provided keywords
	- Optional broadened role variant
- Generates compliant outbound URLs for:
	- LinkedIn Jobs
	- Indeed
- Displays links in a clean, clickable results panel with readable labels

## Guardrails and Scope
- No scraping
- No automated login
- No browser automation against third-party job boards
- URL generation only; links open original platforms in a new tab
- No backend required for v1

## Tech Stack
- TypeScript
- React
- Vite

## Project Structure
```
.
├── AGENTS.md
├── TASK.md
├── README.md
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
└── src
		├── App.tsx
		├── main.tsx
		├── styles.css
		├── types.ts
		├── components
		│   ├── ResultsPanel.tsx
		│   └── SearchForm.tsx
		└── utils
				├── searchGenerator.ts
				├── urlBuilders.ts
				└── validation.ts
```

## Run Locally
1. Install Node.js 18+.
2. Install dependencies:
	 ```bash
	 npm install
	 ```
3. Start the dev server:
	 ```bash
	 npm run dev
	 ```
4. Open the local URL shown by Vite (typically `http://localhost:5173`).

## Build for Production
```bash
npm run build
npm run preview
```

## Quick Git Deploy Command
After making changes, you can run:

```bash
./deployOVN "your commit message"
```

If you omit the message, a default commit message is used.

This command will:
- stage all changes
- commit (if there are changes)
- push to the current branch
- trigger GitHub Actions deployment for GitHub Pages

Optional one-time alias to run it as a single command (`deployOVN`) from this repo:

```bash
echo 'alias deployOVN="\"/Users/greg/Library/CloudStorage/Dropbox/ProactiveTech/Clients/Oncology Voice Network (OVN)/Proof of Concept/Job Search/deployOVN\""' >> ~/.zshrc
source ~/.zshrc
```

## Validation Rules Implemented
- ZIP code must be exactly 5 digits
- Radius must be a whole number between 1 and 100
- Role/title is required
- Up to 3 keywords supported
- Empty/whitespace keywords are trimmed out before URL generation

## Notes for Extension
- Platform URL creation is isolated in `src/utils/urlBuilders.ts`
- Search variant logic is isolated in `src/utils/searchGenerator.ts`
- Validation is isolated in `src/utils/validation.ts`

To add another job platform later, add a new URL builder and include it in the result generation flow.