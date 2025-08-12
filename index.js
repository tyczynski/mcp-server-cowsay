import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import cowsay from 'cowsay';
import { z } from 'zod';

const server = new McpServer({
  name: 'cowsay',
  version: '1.0.0',
  capabilities: {
    resources: {},
    tools: {},
  },
});

server.tool(
  'render_cowsay',
  'Returns a cow saying a specified message',
  {
    message: z.string().describe('The message for the cow to say'),
  },
  ({ message }) => {
    const cowResponse = cowsay.say({
      text: message,
    });

    return {
      content: [
        {
          type: 'text',
          text: cowResponse,
        },
      ],
    };
  },
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);

  console.error('Cowsay MCP Server running on stdio');
}

main().catch((error) => {
  console.error('Fatal error in main():', error);
  process.exit(1);
});
