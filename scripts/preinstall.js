'use strict';

// npm_config_user_agent is set by all package managers before running scripts.
// Its value always starts with the manager name: "pnpm/9.x", "npm/10.x", "yarn/1.x".
// This is the same approach used by pnpm's own `only-allow` package.
const userAgent = process.env.npm_config_user_agent ?? '';

if (userAgent && !userAgent.startsWith('pnpm/')) {
  const detected = userAgent.startsWith('yarn/') ? 'yarn' : 'npm';
  console.error(
    `\x1b[31m[ERROR] This project requires pnpm.\x1b[0m\n` +
      `\x1b[31m        Detected: ${detected}\x1b[0m\n` +
      `\n` +
      `\x1b[33m  Install pnpm:   npm install -g pnpm\x1b[0m\n` +
      `\x1b[33m  Then run:       pnpm install\x1b[0m\n`
  );
  process.exit(1);
}
