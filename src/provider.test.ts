import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { createOnlist, onlist } from "./provider.js";

describe("createOnlist", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("creates a provider with default settings", () => {
    process.env.ONLIST_API_KEY = "test-key";
    const provider = createOnlist();

    expect(provider).toBeDefined();
    expect(typeof provider).toBe("function");
    expect(typeof provider.chatModel).toBe("function");
    expect(typeof provider.completionModel).toBe("function");
    expect(typeof provider.textEmbeddingModel).toBe("function");
  });

  it("creates a chat model with correct model ID", () => {
    process.env.ONLIST_API_KEY = "test-key";
    const provider = createOnlist();
    const model = provider.chatModel("anthropic/claude-sonnet-4");

    expect(model.modelId).toBe("anthropic/claude-sonnet-4");
    expect(model.provider).toBe("onlist.chat");
  });

  it("creates an embedding model", () => {
    process.env.ONLIST_API_KEY = "test-key";
    const provider = createOnlist();
    const model = provider.textEmbeddingModel("openai/text-embedding-3-small");

    expect(model.modelId).toBe("openai/text-embedding-3-small");
    expect(model.provider).toBe("onlist.embedding");
  });

  it("accepts custom baseURL", () => {
    process.env.ONLIST_API_KEY = "test-key";
    const provider = createOnlist({
      baseURL: "https://custom.example.com/v1",
    });
    const model = provider.chatModel("openai/gpt-4o");

    expect(model.modelId).toBe("openai/gpt-4o");
  });

  it("accepts explicit apiKey", () => {
    const provider = createOnlist({ apiKey: "explicit-key" });

    expect(provider).toBeDefined();
  });

  it("callable provider returns a language model", () => {
    process.env.ONLIST_API_KEY = "test-key";
    const provider = createOnlist();
    const model = provider("anthropic/claude-sonnet-4");

    expect(model.modelId).toBe("anthropic/claude-sonnet-4");
  });
});

describe("default onlist instance", () => {
  it("is exported and callable", () => {
    process.env.ONLIST_API_KEY = "test-key";
    expect(onlist).toBeDefined();
    expect(typeof onlist).toBe("function");
  });
});
