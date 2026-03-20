import { test as base } from '@playwright/test';
import { TodoPage } from '../pages/TodoPage';

/**
 * Custom fixture type that extends the base Playwright `test` with
 * a pre-constructed `todoPage` instance.
 *
 * Every test that imports from this file automatically receives
 * a fresh `TodoPage` — no manual `new TodoPage(page)` boilerplate needed.
 */
type Fixtures = {
    todoPage: TodoPage;
};

export const test = base.extend<Fixtures>({
    todoPage: async ({ page }, use) => {
        const todoPage = new TodoPage(page);
        await todoPage.goto();
        await use(todoPage);
    },
});

export { expect } from '@playwright/test';
