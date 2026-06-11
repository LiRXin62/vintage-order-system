import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import Redis from "ioredis";

const redis = new Redis({
  host: "8.136.194.199",
  port: 6379,
  password: "LiRXin_Redis_0620",
  db: 2,
  retryStrategy: (times) => Math.min(times * 50, 2000),
});

const server = new Server(
  { name: "vintage-redis", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "get",
      description: "Get value by key",
      inputSchema: {
        type: "object",
        properties: {
          key: { type: "string", description: "Redis key" },
        },
        required: ["key"],
      },
    },
    {
      name: "set",
      description: "Set key-value pair",
      inputSchema: {
        type: "object",
        properties: {
          key: { type: "string", description: "Redis key" },
          value: { type: "string", description: "Value" },
          ttl: { type: "number", description: "TTL in seconds (optional)" },
        },
        required: ["key", "value"],
      },
    },
    {
      name: "del",
      description: "Delete key",
      inputSchema: {
        type: "object",
        properties: {
          key: { type: "string", description: "Redis key" },
        },
        required: ["key"],
      },
    },
    {
      name: "keys",
      description: "Find keys by pattern",
      inputSchema: {
        type: "object",
        properties: {
          pattern: { type: "string", description: "Pattern (default: *)" },
        },
      },
    },
    {
      name: "ttl",
      description: "Get TTL of a key",
      inputSchema: {
        type: "object",
        properties: {
          key: { type: "string", description: "Redis key" },
        },
        required: ["key"],
      },
    },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    if (name === "get") {
      const value = await redis.get(args?.key as string);
      return { content: [{ type: "text", text: JSON.stringify({ key: args?.key, value }, null, 2) }] };
    }

    if (name === "set") {
      const key = args?.key as string;
      const value = args?.value as string;
      const ttl = args?.ttl as number | undefined;

      if (ttl) {
        await redis.setex(key, ttl, value);
      } else {
        await redis.set(key, value);
      }
      return { content: [{ type: "text", text: JSON.stringify({ key, value, ttl: ttl || "no expiry" }, null, 2) }] };
    }

    if (name === "del") {
      const result = await redis.del(args?.key as string);
      return { content: [{ type: "text", text: JSON.stringify({ key: args?.key, deleted: result === 1 }, null, 2) }] };
    }

    if (name === "keys") {
      const pattern = (args?.pattern as string) || "*";
      const keys = await redis.keys(pattern);
      return { content: [{ type: "text", text: JSON.stringify({ pattern, count: keys.length, keys }, null, 2) }] };
    }

    if (name === "ttl") {
      const ttl = await redis.ttl(args?.key as string);
      return { content: [{ type: "text", text: JSON.stringify({ key: args?.key, ttl }, null, 2) }] };
    }
  } catch (err: any) {
    return { content: [{ type: "text", text: `Redis Error: ${err.message}` }], isError: true };
  }
  throw new Error("Tool not found");
});

const transport = new StdioServerTransport();
await server.connect(transport);
