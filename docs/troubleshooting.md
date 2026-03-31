# Troubleshooting

## Workflow Imports But Credential Nodes Are Blank

That is expected for the public export. Reconnect each Google node to your own n8n credentials.

## Apify Request Fails

Check that `APIFY_API_TOKEN` is set in the n8n environment and that the selected actor is available in your Apify account.

## Gemini Request Fails

Check that `GEMINI_API_KEY` is set and that the key is allowed to call the Gemini API.

## Google Docs Are Empty

Inspect the previous Gemini node output. If the LLM response shape changed or returned an error, the parser will not find `candidates[0].content.parts[0].text`.

## Digest Email Does Not Send

Reconnect the Gmail credential in n8n and confirm `DIGEST_RECIPIENT_EMAIL` is configured.

