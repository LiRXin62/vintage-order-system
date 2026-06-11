import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "8.136.194.199",
  user: "root",
  password: "LiRXin_Mysql8_0620",
  database: "vintage_order",
  port: 3307,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const server = new Server(
  { name: "vintage-db-readonly", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "list_tables",
      description: "List all tables in vintage_order database",
      inputSchema: { type: "object", properties: {} },
    },
    {
      name: "describe_table",
      description: "Show table structure",
      inputSchema: {
        type: "object",
        properties: {
          table: { type: "string", description: "Table name" },
        },
        required: ["table"],
      },
    },
    {
      name: "query_sql",
      description: "Execute SQL query",
      inputSchema: {
        type: "object",
        properties: {
          sql: { type: "string", description: "SQL statement" },
        },
        required: ["sql"],
      },
    },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    if (name === "list_tables") {
      const [rows] = await pool.query("SHOW TABLES");
      return { content: [{ type: "text", text: JSON.stringify({ total: (rows as any[]).length, rows }, null, 2) }] };
    }

    if (name === "describe_table") {
      const table = args?.table as string;
      const [rows] = await pool.query(`SHOW FULL COLUMNS FROM ${table}`);
      return { content: [{ type: "text", text: JSON.stringify({ table, columns: rows }, null, 2) }] };
    }

    if (name === "query_sql") {
      const sql = args?.sql as string;
      const [rows] = await pool.query(sql);
      return { content: [{ type: "text", text: JSON.stringify({ sql, total: (rows as any[]).length, rows }, null, 2) }] };
    }
  } catch (err: any) {
    return { content: [{ type: "text", text: `MySQL Error: ${err.message}` }], isError: true };
  }
  throw new Error("Tool not found");
});

const transport = new StdioServerTransport();
await server.connect(transport);
