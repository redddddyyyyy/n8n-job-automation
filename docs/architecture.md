# Architecture

The workflow is a scheduled n8n pipeline with three main stages: collect, rank, and report.

## Flow

```mermaid
flowchart LR
    A[Cron Trigger] --> B[Search Query Config]
    B --> C[Apify Scraper]
    C --> D[Parse Job Listings]
    D --> E[Keyword Score + Filter]
    E --> F[Google Sheets Append]
    E --> G[Attach Resume Text]
    G --> H[Gemini Draft Adaptation]
    H --> I[Create Google Doc]
    I --> J[Build Summary]
    J --> K[Gmail Digest]
```

## Notes

- The scraper step collects listings for a fixed set of internship-focused search terms.
- The scoring step is intentionally simple and auditable.
- The LLM step drafts an adapted resume for review; it does not submit applications.
- Google Sheets is used as an append-style log for observability.

