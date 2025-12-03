# Frontend Configuration

## OpenAI Integration

Set the following variables in your Vite environment (e.g. `.env.local`) to enable OpenAI requests from the browser:

```
VITE_OPENAI_API_KEY=your_openai_api_key
VITE_OPENAI_MODEL=gpt-4o
VITE_OPENAI_API_URL=https://api.openai.com/v1/chat/completions
```

`VITE_OPENAI_MODEL` and `VITE_OPENAI_API_URL` are optional—omit them to rely on the defaults shown above. The API key is required for all calls. Keep `.env.local` out of version control (`.gitignore` already covers it).

