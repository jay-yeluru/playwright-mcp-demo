import { Page, Locator, expect } from '@playwright/test';

export class TodoPage {
    readonly page: Page;
    readonly newTodoInput: Locator;
    readonly todoItems: Locator;
    readonly deleteButtons: Locator;
    readonly checkboxes: Locator;

    constructor(page: Page) {
        this.page = page;
        this.newTodoInput = page.locator('.new-todo');
        this.todoItems = page.locator('.todo-list li');
        this.deleteButtons = page.locator('.destroy');
        this.checkboxes = page.locator('.toggle');
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

    /**
     * Marks a specific todo (by 0-based index) as completed
     */
    async completeTodo(index: number) {
        const checkbox = this.todoItems.nth(index).locator('.toggle');
        await checkbox.check();
    }

    /**
     * Deletes a specific todo (by 0-based index)
     */
    async deleteTodo(index: number) {
        const todo = this.todoItems.nth(index);
        // The destroy button is CSS-hidden (opacity:0) until the item is hovered.
        // Hover the row first so the button becomes visible, then click it.
        await todo.hover();
        await todo.locator('.destroy').click();
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

    /** Assert whether the todo at the given 0-based index is completed */
    async expectCompleted(index: number, completed = true) {
        const item = this.todoItems.nth(index);
        if (completed) {
            await expect(item).toHaveClass(/completed/);
        } else {
            await expect(item).not.toHaveClass(/completed/);
        }
    }
}
