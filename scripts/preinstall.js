'use strict';

const execPath = process.env.npm_execpath ?? '';
const isNpm = execPath.includes('npm') && !execPath.includes('pnpm');
const isYarn = execPath.includes('yarn');

if (isNpm || isYarn) {
  const detected = isYarn ? 'yarn' : 'npm';
  console.error(
    `\x1b[31m[ERROR] This project requires pnpm.\x1b[0m\n` +
      `\x1b[31m        Detected: ${detected}\x1b[0m\n` +
      `\n` +
      `\x1b[33m  Install pnpm:   npm install -g pnpm\x1b[0m\n` +
      `\x1b[33m  Then run:       pnpm install\x1b[0m\n`
  );
  process.exit(1);
}
