# @onlist/ai-sdk-provider

Onlist provider for the [Vercel AI SDK](https://ai.vercel.dev). Access 40+ AI providers through a unified interface with competitive pricing and provider routing.

## Installation

```bash
npm install @onlist/ai-sdk-provider ai
```

## Quick Start

```typescript
import { createOnlist } from "@onlist/ai-sdk-provider";
import { generateText } from "ai";

const onlist = createOnlist(); // reads ONLIST_API_KEY env var

const { text } = await generateText({
  model: onlist("anthropic/claude-sonnet-4"),
  prompt: "Explain quantum computing in one paragraph.",
});

console.log(text);
```

## Provider Routing

Route requests to specific upstream providers or optimize by price/throughput:

```typescript
import { createOnlist } from "@onlist/ai-sdk-provider";
import { generateText } from "ai";

const onlist = createOnlist();

const { text } = await generateText({
  model: onlist("openai/gpt-4o"),
  prompt: "Hello",
  providerOptions: {
    onlist: {
      provider: {
        sort: "price",
        allow_fallbacks: false,
      },
    },
  },
});
```

## Streaming

```typescript
import { createOnlist } from "@onlist/ai-sdk-provider";
import { streamText } from "ai";

const onlist = createOnlist();

const { textStream } = streamText({
  model: onlist("anthropic/claude-sonnet-4"),
  prompt: "Write a short poem about the moon.",
});

for await (const chunk of textStream) {
  process.stdout.write(chunk);
}
```

## Configuration

```typescript
const onlist = createOnlist({
  apiKey: "sk-...", // defaults to ONLIST_API_KEY env var
  baseURL: "https://onlist.io/v1", // default
  appName: "My App", // shown on onlist.io dashboard
  appUrl: "https://myapp.com", // HTTP-Referer for attribution
  headers: {}, // additional custom headers
});
```

## Default Instance

A pre-configured instance is available for quick usage:

```typescript
import { onlist } from "@onlist/ai-sdk-provider";
import { generateText } from "ai";

const { text } = await generateText({
  model: onlist("openai/gpt-4o"),
  prompt: "Hello!",
});
```

## Links

- [Onlist](https://onlist.io)
- [Onlist Documentation](https://onlist.io/docs)
- [Vercel AI SDK](https://ai.vercel.dev)

## License

MIT
