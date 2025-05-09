# Cloudflare AI Gateway Test

This is a repro to show that AI Wholesaling with the AI SDK and the AI Gateway is not working.

## To run the tests

1. Add your Cloudflare AI Gateway token, account ID, and gateway ID to the `.dev.vars` file.
2. Run `pnpm install` to install dependencies.
3. Run `pnpm test` to run the tests.

Hitting the AI Gateway directly works fine. It's the AI SDK that's not working.
