# Workflow Nodes

## Schedule And Config

- `Daily 7AM Trigger`: runs the workflow on a daily schedule.
- `Config - Search Queries & Settings`: stores search terms, batch size, resume file ID, and digest recipient.
- `Split Into Individual Queries`: expands the comma-separated search list into one item per query.

## Collection And Ranking

- `Apify - Scrape LinkedIn Jobs`: calls the Apify actor.
- `Parse Job Listings`: normalizes listing fields.
- `Rank & Filter Top Jobs`: assigns a keyword score, filters strict PhD-title roles, and keeps the top jobs.
- `Save All Jobs to Google Sheet`: appends selected listing metadata to a sheet.

## Enrichment And Reporting

- `Google Drive - Get Resume`: downloads the base resume text.
- `Merge Resume + Job Data`: attaches resume text to each selected job.
- `Loop Over Items`: rate-limits LLM calls.
- `Gemini - Tailor Resume`: drafts a job-specific resume adaptation.
- `Create Google Doc` and `Insert Resume Text into Doc`: create a review document.
- `Build Email Summary` and `Gmail - Send Summary`: send the daily digest.

