# Security Notes

This public export is designed to be imported into n8n only after adding private credentials through n8n or environment variables.

## Do Not Commit

- `.env`
- OAuth client secrets
- service account JSON files
- Apify tokens
- Gemini or OpenAI keys
- Gmail refresh tokens
- raw scraped data
- generated resumes or Google Docs exports
- private Google Drive, Docs, or Sheets links
- n8n credential exports
- logs with URLs, account IDs, or private emails

## Recommended Setup

Use n8n credentials for Google Workspace nodes and environment variables for plain HTTP API keys.

For example:

```text
{{ $env.APIFY_API_TOKEN }}
{{ $env.GEMINI_API_KEY }}
{{ $env.GOOGLE_SHEET_ID }}
```

## If A Key Is Exposed

Revoke or rotate the key first. Then remove it from the current files and rewrite git history before making the repo public again.

