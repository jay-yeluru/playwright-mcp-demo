import { defineConfig, devices } from '@playwright/test';
import * as path from 'path';

// Load .env for local development. On CI the shell environment is used directly.
// Using a try/catch so the server doesn't crash if dotenv isn't installed yet.
try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require('dotenv').config({ path: path.resolve(__dirname, '.env') });
} catch {
    // dotenv is optional – CI injects env vars at the OS level
}

// Base URL should be the domain root (e.g. https://demo.playwright.dev).
// TodoPage.goto() appends the app path (/todomvc/) so the two combine correctly.
const BASE_URL =
    process.env.BASE_URL ?? 'https://demo.playwright.dev';

export default defineConfig({
    testDir: './e2e/tests',

    /* Run tests in files in parallel */
    fullyParallel: true,

    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,

    /* Retry on CI only */
    retries: process.env.CI ? 2 : 0,

    /* Opt out of parallel tests on CI. */
    workers: process.env.CI ? 1 : undefined,

    /* Reporters: pretty list locally, full HTML report on CI */
    reporter: process.env.CI
        ? [['list'], ['html', { open: 'never' }]]
        : [['list']],

    use: {
        /* Base URL — swap environments via .env or CI variable */
        baseURL: BASE_URL,

        /* Full traces on CI so you can replay failures in the viewer */
        trace: process.env.CI ? 'on' : 'on-first-retry',

        /* Video on CI for visual debugging */
        video: process.env.CI ? 'on-first-retry' : 'off',
    },

    /* Configure projects for major browsers */
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
});
