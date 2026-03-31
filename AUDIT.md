# Public Safety Audit

Date: 2026-06-30

## Repo Purpose

This repository contains a sanitized n8n workflow for a daily AI-assisted job-market data pipeline. It is intended to show architecture, orchestration logic, scoring logic, and Google Workspace integration without publishing private data or live credentials.

## Sensitive Files Found

The original workflow export contained account-specific values and credential material:

- Apify API token in HTTP request nodes
- Gemini API key in the Gemini HTTP request URL
- personal digest email address
- Google Sheet and resume file identifiers
- n8n credential binding IDs for Google Drive, Docs, Sheets, and Gmail
- n8n webhook IDs

The repository owner reported that the exposed Apify and Gemini keys were revoked before publication cleanup.

## Removed Or Redacted

- Replaced API keys with n8n environment-variable references
- Replaced personal email and Google file IDs with placeholders
- Removed n8n credential objects from the workflow export
- Removed n8n webhook IDs from the workflow export
- Replaced private Google Sheets URLs with placeholder URLs
- Replaced unsupported resume-prompt details with generic candidate-highlight placeholders
- Added `.gitignore` rules for env files, credentials, logs, and downloaded exports

## Secret Scan Status

Manual scans were run with ripgrep for common token, key, credential, URL, and email patterns. See the final cleanup notes for the exact commands and results.

`gitleaks` and `trufflehog` were not installed in this local environment. Manual ripgrep scans were run instead, including exact-value checks for the previously exposed values. Run gitleaks or trufflehog as an additional check before future public releases if available.

## Remaining TODOs

- Reconnect private n8n credentials after importing the sanitized workflow.
- Add real run metrics only after measuring them.
- Add screenshots only after removing or blurring private account details.
- Keep generated resumes, raw scraped data, and Gmail content out of git.

## Public Readiness

Status: public-safe after history rewrite and successful secret scan.


