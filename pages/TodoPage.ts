import { Page, Locator } from '@playwright/test';

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

    async goto() {
        await this.page.goto('https://demo.playwright.dev/todomvc/');
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
        // Button is only visible on hover, but Playwright can force click it
        await todo.locator('.destroy').click({ force: true });
    }
}
