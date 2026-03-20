import { Page, Locator, expect } from '@playwright/test';

export class TodoPage {
    readonly page: Page;
    readonly newTodoInput: Locator;
    readonly todoItems: Locator;

    constructor(page: Page) {
        this.page = page;
        this.newTodoInput = page.locator('.new-todo');
        this.todoItems = page.locator('.todo-list li');
    }

    /**
     * Navigate to the app.
     * Uses baseURL from playwright.config.ts so swapping environments
     * only requires changing the BASE_URL env variable — no code change needed.
     */
    async goto() {
        await this.page.goto('/todomvc/');
    }

    /**
     * Adds a new todo item by typing and pressing Enter
     */
    async addTodo(text: string) {
        await this.newTodoInput.fill(text);
        await this.newTodoInput.press('Enter');
    }

    // ─── Reusable assertions ────────────────────────────────────────────────

    /** Assert the total number of visible todo items */
    async expectCount(count: number) {
        await expect(this.todoItems).toHaveCount(count);
    }

    /** Assert the visible text of the todo at the given 0-based index */
    async expectItemText(index: number, text: string) {
        await expect(this.todoItems.nth(index).locator('label')).toHaveText(text);
    }
}
