import {
  createOpenAICompatible,
  type OpenAICompatibleProvider,
} from "@ai-sdk/openai-compatible";
import { VERSION } from "./version.js";

export interface OnlistProviderSettings {
  baseURL?: string;
  apiKey?: string;
  headers?: Record<string, string>;
  appName?: string;
  appUrl?: string;
  fetch?: typeof globalThis.fetch;
}

export function createOnlist(
  options: OnlistProviderSettings = {},
): OpenAICompatibleProvider {
  const apiKey =
    options.apiKey ??
    (typeof process !== "undefined"
      ? process.env?.ONLIST_API_KEY
      : undefined);

  return createOpenAICompatible({
    name: "onlist",
    baseURL: options.baseURL ?? "https://onlist.io/v1",
    apiKey,
    headers: {
      "User-Agent": `onlist-ai-sdk/${VERSION}`,
      "HTTP-Referer": options.appUrl ?? "https://onlist.io",
      ...(options.appName && { "X-Title": options.appName }),
      ...options.headers,
    },
    fetch: options.fetch,
  });
}

export const onlist = createOnlist();
