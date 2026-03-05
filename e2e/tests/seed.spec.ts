import { test, expect } from '../fixtures/base';
import { TODO_ITEMS } from '../data/todo.data';

/**
 * 🌱 SEED FILE — AI Entry Point
 * ─────────────────────────────────────────────────────────────────────────────
 * This file is intentionally minimal. It is the blank canvas you hand to an
 * AI agent (via Playwright MCP) and watch it generate tests in real-time.
 *
 * HOW TO USE:
 * 1. Open your AI chat (GitHub Copilot, Claude, Cursor, etc.)
 * 2. Make sure the Playwright MCP server is running (.vscode/mcp.json)
 * 3. Paste this prompt:
 *
 *    "Use your Playwright MCP tools to open https://demo.playwright.dev/todomvc,
 *     inspect the live DOM, and add meaningful test steps to the 'seed' test
 *     in e2e/tests/seed.spec.ts. Use the todoPage POM methods and the
 *     TODO_ITEMS data constants. Group new tests in describe blocks by feature."
 *
 * WHAT'S ALREADY SET UP FOR YOU:
 * - `todoPage`  → auto-navigates to the app (see e2e/fixtures/base.ts)
 * - `TODO_ITEMS` → typed test strings (see e2e/data/todo.data.ts)
 * - `TodoPage`  → actions (addTodo, completeTodo, deleteTodo)
 *              + assertions (expectCount, expectItemText, expectCompleted)
 *
 * WANT TO SEE THE FINISHED RESULT?
 * → e2e/tests/todo.spec.ts is the reference implementation.
 * ─────────────────────────────────────────────────────────────────────────────
 */

test.describe('TodoMVC — seed', () => {
    test('app loads and input is ready', async ({ todoPage }) => {
        // ✅ This one assertion confirms the app is up and the fixture works.
        // The AI (or you!) can add more test steps below, or add new
        // describe blocks above this one. All infrastructure is wired up.
        await expect(todoPage.newTodoInput).toBeVisible();
    });

    // 👇 AI: add your generated tests here
});
